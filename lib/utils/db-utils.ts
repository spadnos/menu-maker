import { createClient } from '@/utils/supabase/server';
import type { SupabaseClient } from '@supabase/supabase-js';

type QueryResult<T> = {
  data: T | null;
  error: Error | null;
};

/**
 * Execute a database query with error handling
 * @param queryFn The query function to execute
 * @returns A promise that resolves to the query result
 */
export async function executeQuery<T>(
  queryFn: (supabase: SupabaseClient) => Promise<{
    data: T | null;
    error: unknown;
  }>
): Promise<QueryResult<T>> {
  try {
    const supabase = await createClient();
    const { data, error } = await queryFn(supabase);

    if (error) {
      console.error('Database error:', error);
      const errorMessage =
        error && typeof error === 'object' && 'message' in error
          ? String(error.message)
          : 'Database error';
      return {
        data: null,
        error: new Error(errorMessage),
      };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Unexpected error in executeQuery:', error);
    return {
      data: null,
      error:
        error instanceof Error
          ? error
          : new Error('An unexpected error occurred'),
    };
  }
}

/**
 * Get a single record by ID
 * @param table The table name
 * @param id The record ID
 * @returns The record or null if not found
 */
export async function getById<T>(
  table: string,
  id: string
): Promise<QueryResult<T>> {
  return executeQuery<T>(async (supabase) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();

    return { data, error };
  });
}

/**
 * Get all records from a table
 * @param table The table name
 * @param options Query options
 * @returns An array of records
 */
export async function getAll<T>(
  table: string,
  options: {
    columns?: string;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
    eq?: { column: string; value: unknown };
  } = {}
): Promise<QueryResult<T[]>> {
  return executeQuery<T[]>(async (supabase) => {
    let query = supabase.from(table).select(options.columns || '*');

    if (options.orderBy) {
      query = query.order(options.orderBy.column, {
        ascending: options.orderBy.ascending ?? true,
      });
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.eq) {
      query = query.eq(options.eq.column, options.eq.value);
    }

    const { data: result, error } = (await query) as unknown as {
      data: T[] | null;
      error: unknown;
    };

    return {
      data: result || [],
      error,
    };
  });
}

/**
 * Insert a new record
 * @param table The table name
 * @param data The data to insert
 * @returns The inserted record
 */
export async function insert<T>(
  table: string,
  data: Omit<T, 'id' | 'created_at' | 'updated_at'>
): Promise<QueryResult<T>> {
  return executeQuery<T>(async (supabase) => {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();

    return { data: result, error };
  });
}

/**
 * Update a record
 * @param table The table name
 * @param id The record ID
 * @param data The data to update
 * @returns The updated record
 */
export async function update<T>(
  table: string,
  id: string,
  data: Partial<Omit<T, 'id' | 'created_at'>> & { updated_at?: string }
): Promise<QueryResult<T>> {
  return executeQuery<T>(async (supabase) => {
    const { data: result, error } = await supabase
      .from(table)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    return { data: result, error };
  });
}

/**
 * Delete a record
 * @param table The table name
 * @param id The record ID
 * @returns True if the record was deleted
 */
export async function remove(
  table: string,
  id: string
): Promise<QueryResult<boolean>> {
  return executeQuery<boolean>(async (supabase) => {
    const { error } = await supabase.from(table).delete().eq('id', id);

    return {
      data: !error,
      error: error || null,
    };
  });
}

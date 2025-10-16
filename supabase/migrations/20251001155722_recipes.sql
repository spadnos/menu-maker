alter table "public"."recipes" drop constraint "recipes_menu_item_id_fkey";

alter table "public"."recipes" drop constraint "recipes_menu_item_id_key";

alter table "public"."recipes" drop constraint "recipes_prep_time_mins_check";

drop index if exists "public"."recipes_menu_item_id_idx";

drop index if exists "public"."recipes_menu_item_id_key";

alter table "public"."categories" alter column "id" set default gen_random_uuid();

alter table "public"."menu_items" alter column "id" set default gen_random_uuid();

alter table "public"."recipes" drop column "menu_item_id";

alter table "public"."recipes" add column "cook_time_mins" integer;

alter table "public"."recipes" add column "created_by" uuid;

alter table "public"."recipes" add column "description" text;

alter table "public"."recipes" add column "image_url" text;

alter table "public"."recipes" add column "name" text not null default 'Recipe Name'::text;

alter table "public"."recipes" add column "servings" integer;

alter table "public"."recipes" add constraint "recipes_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) not valid;

alter table "public"."recipes" validate constraint "recipes_created_by_fkey";

alter table "public"."recipes" add constraint "recipes_prep_time_mins_check" CHECK ((prep_time_mins >= 0)) not valid;

alter table "public"."recipes" validate constraint "recipes_prep_time_mins_check";

create policy "Enable insert for authenticated users only"
on "public"."recipes"
as permissive
for insert
to authenticated
with check (true);

-- Creators can update their own recipes
create policy "Creators can update recipes"
on "public"."recipes"
as permissive
for update
to authenticated
using (auth.uid() = recipes.created_by)
with check (auth.uid() = recipes.created_by);

-- Creators can delete their own recipes
create policy "Creators can delete recipes"
on "public"."recipes"
as permissive
for delete
to authenticated
using (auth.uid() = recipes.created_by);




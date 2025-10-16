import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;
  const errorMessage = params.message;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400">
            Authentication Error
          </h1>
          <p className="text-lg text-muted-foreground">
            We encountered an issue while trying to authenticate you.
          </p>
        </div>

        <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-800 dark:text-red-200 font-semibold mb-2">
            {errorMessage || 'Authentication failed'}
          </p>
          <p className="text-xs text-red-700 dark:text-red-300">
            Please check your credentials and try again. If you don&apos;t have
            an account yet, please sign up first.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login">
            <Button className="w-full sm:w-auto">Try Again</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>Common issues:</p>
          <ul className="list-disc list-inside text-left max-w-xs mx-auto">
            <li>Incorrect email or password</li>
            <li>Email not verified (check your inbox)</li>
            <li>Account doesn&apos;t exist yet</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

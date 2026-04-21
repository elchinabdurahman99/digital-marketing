import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="text-center">
        <div className="text-8xl font-extrabold text-gray-100 select-none mb-4">404</div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Page not found</h1>
        <p className="text-gray-500 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Button href="/" arrow>Back to home</Button>
      </div>
    </div>
  );
}

import dynamic from 'next/dynamic';
import { ThemeProvider } from '@/app/components/ThemeProvider';

// Dynamically import the Login component with SSR disabled
const Login = dynamic(() => import('@/app/components/Login'), { ssr: false });

export default function LoginPage() {
  return (
    <ThemeProvider>
      <Login />
    </ThemeProvider>
  );
}
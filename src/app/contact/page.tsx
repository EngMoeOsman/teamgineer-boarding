// app/contact/page.tsx
import { ContactForm } from '@/components/ContactForm'; // or wherever you store the component
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with us for any questions or project ideas.',
};

export default function ContactPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
      }}
    >
      <ContactForm />
    </main>
  );
}

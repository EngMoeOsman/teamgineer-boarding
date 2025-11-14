'use client';

import { mailchimp } from '@/resources';
import {
  Background,
  Button,
  Column,
  Heading,
  Input,
  opacity,
  SpacingToken,
  Text,
  Textarea,
} from '@once-ui-system/core';
import { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = {
  [K in keyof FormData]?: string;
};

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export const ContactForm: React.FC<React.ComponentProps<typeof Column>> = ({
  ...flex
}) => {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormData];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!form.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (form.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }

    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      // Send to your API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Success state
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setErrors({});

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Failed to send message. Please try again.'
      );

      // Reset error state after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <Column
      position='relative'
      overflow='hidden'
      fillWidth
      padding='xl'
      radius='l'
      marginBottom='xl'
      horizontal='center'
      align='center'
      background='surface'
      border='neutral-alpha-weak'
      style={{
        width: '100%',
        maxWidth: '1200px',
        marginInline: 'auto',
      }}
      {...flex}
    >
      {/* Background effects */}
      <Background
        top='0'
        position='absolute'
        mask={{
          x: mailchimp.effects.mask.x,
          y: mailchimp.effects.mask.y,
          radius: mailchimp.effects.mask.radius,
          cursor: mailchimp.effects.mask.cursor,
        }}
        gradient={{
          display: mailchimp.effects.gradient.display,
          opacity: mailchimp.effects.gradient.opacity as opacity,
          x: mailchimp.effects.gradient.x,
          y: mailchimp.effects.gradient.y,
          width: mailchimp.effects.gradient.width,
          height: mailchimp.effects.gradient.height,
          tilt: mailchimp.effects.gradient.tilt,
          colorStart: mailchimp.effects.gradient.colorStart,
          colorEnd: mailchimp.effects.gradient.colorEnd,
        }}
        dots={{
          display: mailchimp.effects.dots.display,
          opacity: mailchimp.effects.dots.opacity as opacity,
          size: mailchimp.effects.dots.size as SpacingToken,
          color: mailchimp.effects.dots.color,
        }}
        grid={{
          display: mailchimp.effects.grid.display,
          opacity: mailchimp.effects.grid.opacity as opacity,
          color: mailchimp.effects.grid.color,
          width: mailchimp.effects.grid.width,
          height: mailchimp.effects.grid.height,
        }}
        lines={{
          display: mailchimp.effects.lines.display,
          opacity: mailchimp.effects.lines.opacity as opacity,
          size: mailchimp.effects.lines.size as SpacingToken,
          thickness: mailchimp.effects.lines.thickness,
          angle: mailchimp.effects.lines.angle,
          color: mailchimp.effects.lines.color,
        }}
      />

      {/* Header */}
      <Column
        maxWidth='m'
        horizontal='center'
        align='center'
        marginBottom='xl'
        style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        <Heading variant='display-strong-xs' marginBottom='s'>
          Get in Touch
        </Heading>
        <Text
          wrap='balance'
          onBackground='neutral-weak'
          variant='body-default-l'
        >
          Whether you have a question, a project idea, or just want to say hello
          — we'd love to hear from you.
        </Text>
      </Column>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'grid',
          gap: '1.5rem',
          width: '100%',
          maxWidth: '900px',
          position: 'relative',
          zIndex: 1,
        }}
        noValidate
      >
        <div
          style={{
            display: 'grid',
            gap: '1.5rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          }}
        >
          <Input
            id='contact-name'
            name='name'
            placeholder='Your Name'
            value={form.name}
            onChange={handleChange}
            errorMessage={errors.name}
            required
            aria-label='Your Name'
            aria-required='true'
            aria-invalid={!!errors.name}
            disabled={status === 'submitting'}
          />
          <Input
            id='contact-email'
            name='email'
            type='email'
            placeholder='Your Email'
            value={form.email}
            onChange={handleChange}
            errorMessage={errors.email}
            required
            aria-label='Your Email'
            aria-required='true'
            aria-invalid={!!errors.email}
            disabled={status === 'submitting'}
          />
        </div>

        <Input
          id='contact-subject'
          name='subject'
          placeholder='Subject'
          value={form.subject}
          onChange={handleChange}
          errorMessage={errors.subject}
          required
          aria-label='Subject'
          aria-required='true'
          aria-invalid={!!errors.subject}
          disabled={status === 'submitting'}
        />

        <Textarea
          id='contact-message'
          name='message'
          placeholder='Your Message'
          value={form.message}
          onChange={handleChange}
          errorMessage={errors.message}
          rows={6}
          required
          aria-label='Your Message'
          aria-required='true'
          aria-invalid={!!errors.message}
          disabled={status === 'submitting'}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '0.5rem',
          }}
        >
          <Button
            type='submit'
            size='m'
            variant='primary'
            disabled={status === 'submitting' || status === 'success'}
            style={{
              width: '100%',
              maxWidth: '300px',
              transition: 'all 0.3s ease',
            }}
            aria-label={
              status === 'submitting'
                ? 'Sending message'
                : status === 'success'
                ? 'Message sent'
                : 'Send message'
            }
          >
            {status === 'submitting'
              ? 'Sending...'
              : status === 'success'
              ? 'Message Sent ✓'
              : 'Send Message'}
          </Button>
        </div>
      </form>

      {/* Success feedback message */}
      {status === 'success' && (
        <Column
          fillWidth
          horizontal='center'
          style={{
            marginTop: '1.5rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            role='status'
            aria-live='polite'
            style={{
              background: 'rgba(0, 200, 120, 0.08)',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              border: '1px solid rgba(0, 200, 120, 0.2)',
              maxWidth: '600px',
              width: '100%',
              textAlign: 'center',
              animation: 'fadeIn 0.4s ease',
            }}
          >
            <Text
              variant='body-default-l'
              style={{
                color: 'rgb(0, 180, 100)',
              }}
            >
              ✓ Thank you for reaching out! We'll get back to you soon.
            </Text>
          </div>
        </Column>
      )}

      {/* Error feedback message */}
      {status === 'error' && errorMessage && (
        <Column
          fillWidth
          horizontal='center'
          style={{
            marginTop: '1.5rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            role='alert'
            aria-live='assertive'
            style={{
              background: 'rgba(220, 38, 38, 0.08)',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              border: '1px solid rgba(220, 38, 38, 0.2)',
              maxWidth: '600px',
              width: '100%',
              textAlign: 'center',
              animation: 'fadeIn 0.4s ease',
            }}
          >
            <Text
              variant='body-default-l'
              style={{
                color: 'rgb(220, 38, 38)',
              }}
            >
              ✕ {errorMessage}
            </Text>
          </div>
        </Column>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Column>
  );
};

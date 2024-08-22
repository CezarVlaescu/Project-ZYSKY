'use client';

import * as React from 'react';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Controller, useForm, type Control, type FieldError } from 'react-hook-form';
import { z as zod } from 'zod';

import { type IuserRegisterData } from '@/types/shared-types';
import { useAuth } from '@/hooks/use-auth';
import imageSrc from '@/styles/assets/b23ee7d88ea097cf5aaddf4b5cdded51.png';

const schema = zod
  .object({
    firstname: zod.string().min(1, { message: 'First name is required' }),
    lastname: zod.string().min(1, { message: 'Last name is required' }),
    email: zod.string().min(1, { message: 'Email is required' }).email(),
    confirmEmail: zod.string().min(1, { message: 'Confirm Email is required' }).email(),
    password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
    confirmPassword: zod.string().min(1, { message: 'Confirm Password is required' }),
    phone: zod.string().min(1, { message: 'Phone number is required' }),
    company_name: zod.string().min(1, { message: 'Company name is required' }),
    company_nip: zod.string().min(1, { message: 'NIP is required' }),
    company_zip: zod.string().min(1, { message: 'ZIP code is required' }),
    company_street: zod.string().min(1, { message: 'Street is required' }),
    company_city: zod.string().min(1, { message: 'City is required' }),
    terms: zod.boolean().refine((value) => value, 'You must accept the terms and conditions'),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: 'Emails do not match',
    path: ['confirmEmail'],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type Values = zod.infer<typeof schema>;

const defaultValues = {
  firstname: '',
  lastname: '',
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: '',
  phone: '',
  company_name: '',
  company_nip: '',
  company_street: '',
  company_zip: '',
  company_city: '',
  terms: false,
} satisfies Values;

type Tname =
  | 'firstname'
  | 'lastname'
  | 'email'
  | 'confirmEmail'
  | 'password'
  | 'confirmPassword'
  | 'phone'
  | 'company_name'
  | 'company_nip'
  | 'company_zip'
  | 'company_street'
  | 'company_city'
  | 'terms';

interface IsignUpFieldProps {
  control: Control<Values>;
  name: Tname;
  label: string;
  type?: string;
  error?: FieldError;
}

function SignUpField({ control, name, label, type = 'text', error }: IsignUpFieldProps): React.JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl error={Boolean(error)}>
          <InputLabel>{label}</InputLabel>
          <OutlinedInput
            {...field}
            label={label}
            type={type}
            sx={{ backgroundColor: 'white', boxShadow: '0px 4px 21px rgba(0, 0, 0, 0.3)' }}
          />
          {error ? <FormHelperText>{error.message}</FormHelperText> : null}
        </FormControl>
      )}
    />
  );
}

export function SignUpForm(): React.JSX.Element {
  const { register, loading, error } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = (values: Values): void => {
    const registerData: IuserRegisterData = {
      email: values.email,
      password: values.password,
      phone: values.phone,
      company_name: values.company_name,
      company_nip: values.company_nip,
      firstname: values.firstname,
      lastname: values.lastname,
      company_zip: values.company_zip,
      company_city: values.company_city,
      company_street: values.company_street,
      role: 1,
    };
    void register(registerData);
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={1} alignItems="center">
        <Image src={imageSrc} alt="logo" width={400} height={160} />
        <Typography variant="h4" color="textPrimary">
          Partner Registration
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)} style={{ border: '1px solid black', padding: '30px 40px' }}>
        <Box sx={{ display: 'flex', gap: '60px' }}>
          <Stack spacing={2} sx={{ display: 'flex', flex: '0 0 45%' }}>
            <SignUpField control={control} name="firstname" label="First name" error={errors.firstname} />
            <SignUpField control={control} name="lastname" label="Last name" error={errors.lastname} />
            <SignUpField control={control} name="email" label="Email address" type="email" error={errors.email} />
            <SignUpField
              control={control}
              name="confirmEmail"
              label="Confirm your Email"
              type="confirmEmail"
              error={errors.confirmEmail}
            />
            <SignUpField control={control} name="password" label="Password" type="password" error={errors.password} />
            <SignUpField
              control={control}
              name="confirmPassword"
              label="Confirm password"
              type="password"
              error={errors.confirmPassword}
            />
          </Stack>
          <Stack spacing={2}>
            <SignUpField control={control} name="company_name" label="Company Name" error={errors.company_name} />
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <SignUpField control={control} name="company_zip" label="ZIP" error={errors.company_zip} />
              <SignUpField control={control} name="company_city" label="City" error={errors.company_city} />
            </Box>
            <SignUpField
              control={control}
              name="company_street"
              label="Street & Number"
              error={errors.company_street}
            />
            <SignUpField control={control} name="phone" label="Phone" error={errors.phone} />
            <SignUpField control={control} name="company_nip" label="NIP" error={errors.company_nip} />
            <Typography>You must read and accept the following documents to continue</Typography>
            <Box sx={{ display: 'flex' }}>
              <Controller
                control={control}
                name="terms"
                render={({ field }) => (
                  <div>
                    <FormControlLabel control={<Checkbox {...field} />} label={<Link>Privacy Policy</Link>} />
                    {errors.terms ? <FormHelperText error>{errors.terms.message}</FormHelperText> : null}
                  </div>
                )}
              />
              <Controller
                control={control}
                name="terms"
                render={({ field }) => (
                  <div>
                    <FormControlLabel control={<Checkbox {...field} />} label={<Link>Terms of Service</Link>} />
                    {errors.terms ? <FormHelperText error>{errors.terms.message}</FormHelperText> : null}
                  </div>
                )}
              />
            </Box>
          </Stack>
        </Box>
        <Box display="flex" justifyContent="flex-end" marginTop="20px">
          {error ? <Alert color="error">{error}</Alert> : null}
          <Button
            disabled={loading}
            type="submit"
            variant="contained"
            sx={{ backgroundColor: '#BBD260', '&:hover': { backgroundColor: '#BBD260' } }}
          >
            Sign up
          </Button>
        </Box>
      </form>
    </Stack>
  );
}

'use client';

import * as React from 'react';
import Image from 'next/image';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
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

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';
import imageSrc from '@/styles/assets/b23ee7d88ea097cf5aaddf4b5cdded51.png';

const schema = zod.object({
  firstName: zod.string().min(1, { message: 'First name is required' }),
  lastName: zod.string().min(1, { message: 'Last name is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
  terms: zod.boolean().refine((value) => value, 'You must accept the terms and conditions'),
  companyName: zod.string().min(1, { message: 'Company name requeired' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  terms: false,
  companyName: '',
} satisfies Values;

interface ISignUpFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  type?: string;
  error?: FieldError;
}

function SignUpField({ control, name, label, type = 'text', error }: ISignUpFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl error={Boolean(error)}>
          <InputLabel>{label}</InputLabel>
          <OutlinedInput {...field} label={label} type={type} sx={{backgroundColor: 'white', boxShadow: '0px 4px 21px rgba(0, 0, 0, 0.3)'}}/>
          {error ? <FormHelperText>{error.message}</FormHelperText> : null}
        </FormControl>
      )}
    />
  );
}

export function SignUpForm(): React.JSX.Element {
  const router = useRouter();
  const { checkSession } = useUser();
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { error } = await authClient.signUp(values);

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }
      await checkSession?.();
      router.refresh();
    },
    [checkSession, router, setError]
  );

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
            <SignUpField control={control} name="firstName" label="First name" error={errors.firstName} />
            <SignUpField control={control} name="lastName" label="Last name" error={errors.lastName} />
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
            <SignUpField control={control} name="companyName" label="Company Name" error={errors.companyName} />
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <SignUpField control={control} name="zip" label="ZIP" error={errors.zip} />
              <SignUpField control={control} name="city" label="City" error={errors.city} />
            </Box>
            <SignUpField control={control} name="streetNumber" label="Street & Number" error={errors.streetNumber} />
            <SignUpField control={control} name="phone" label="Phone" error={errors.phone} />
            <SignUpField control={control} name="nip" label="NIP" error={errors.nip} />
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
      </form>
      <Box display='flex' justifyContent='flex-end'>
        {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
        <Button disabled={isPending} type="submit" variant="contained" sx={{backgroundColor: '#BBD260', '&:hover' : {backgroundColor: '#BBD260'}}}>
          Sign up
        </Button>
      </Box>
    </Stack>
  );
}

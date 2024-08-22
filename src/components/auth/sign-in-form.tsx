'use client';

import * as React from 'react';
import Image from 'next/image';
import RouterLink from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Checks } from '@phosphor-icons/react';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { paths } from '@/paths';
import { useAuth } from '@/hooks/use-auth';
import imageSrc from '@/styles/assets/b23ee7d88ea097cf5aaddf4b5cdded51.png';
import {useRouter} from 'next/navigation';
import { PolicyAgreementModal } from '@/utils/modal-terms-component';

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: '', password: '' } satisfies Values;

export function SignInForm(): React.JSX.Element {
  const { login, loading, error, showModal, agreeToPolicies } = useAuth();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = (values: Values): void => {
    void login(values);
  };

  return (
    <Stack spacing={6}>
      <Stack spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
        <Image src={imageSrc} alt="logo" width={381} height={160} />
        <Typography variant="h3">PARTNER PORTAL</Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput
                  sx={{ backgroundColor: 'white', boxShadow: '0px 4px 21px rgba(0, 0, 0, 0.3)' }}
                  {...field}
                  label="Email address"
                  type="email"
                  endAdornment={<Checks />}
                />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  {...field}
                  sx={{ backgroundColor: 'white', boxShadow: '0px 4px 21px rgba(0, 0, 0, 0.3)' }}
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link component={RouterLink} href={paths.auth.resetPassword} variant="subtitle2">
              Forgot password?
            </Link>
          </div>
          {error ? <Alert color="error">{error}</Alert> : null}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '30px',
            }}
          >
            <Button
              disabled={loading}
              type="submit"
              variant="contained"
              sx={{ backgroundColor: '#2d9f9f', '&:hover': { backgroundColor: '#2d9f9f' } }}
              onClick={() => { router.push(paths.auth.signUp); }}
            >
              Sign up
            </Button>
            <Button
              disabled={loading}
              type="submit"
              variant="contained"
              sx={{ backgroundColor: '#BBD260', '&:hover': { backgroundColor: '#BBD260' } }}
            >
              Sign in
            </Button>
          </Box>
        </Stack>
      </form>
      <PolicyAgreementModal open={showModal} onClose={() => {}} onAgree={agreeToPolicies} />
    </Stack>
  );
}

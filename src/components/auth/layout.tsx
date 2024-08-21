import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          flex: '1 0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '950px',
            width: '100%',
            padding: 3,
          }}
        >
          {children}
        </Box>
      </Box>

      <Box
        component="footer"
        sx={{
          backgroundColor: 'rgba(37, 37, 37, 0.9)', // Using the color with 90% opacity
          color: '#fff',
          height: '71px', // Fixed height as per design
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body2">
          All Rights Reserved, 2024 ZYSKY Sp. z o.o.
        </Typography>
      </Box>
    </Box>
  );
}

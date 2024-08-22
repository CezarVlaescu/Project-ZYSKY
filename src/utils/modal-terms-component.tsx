'use client';

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';

interface IpolicyAgreementModalProps {
    open: boolean;
    onClose: () => void;
    onAgree: () => void;
}

export function PolicyAgreementModal({ open, onClose, onAgree }: IpolicyAgreementModalProps): React.JSX.Element {
    const [checked, setChecked] = React.useState(false);

    const handleAgree = () : void => {
        if (checked) {
            onAgree();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Policy Agreement</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You need to agree to our policies to continue using the platform.
                </DialogContentText>
                <FormControlLabel
                    control={<Checkbox checked={checked} onChange={() => { setChecked(!checked); }} />}
                    label={<Link href="https://zysky.pl/polityka-prywatnosci/" target="_blank">Privacy Policy</Link>}
                />
                <FormControlLabel
                    control={<Checkbox checked={checked} onChange={() => { setChecked(!checked); }} />}
                    label={<Link href="https://zysky.pl/swiadczenie-uslug/" target="_blank">Terms of Service</Link>}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleAgree} color="primary" disabled={!checked}>
                    Agree and Continue
                </Button>
            </DialogActions>
        </Dialog>
    );
}

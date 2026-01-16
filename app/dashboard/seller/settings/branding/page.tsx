import { Palette } from 'lucide-react';
import ProLockedPage from '@/app/components/ProLockedPage';

export default function BrandingPage() {
    return (
        <ProLockedPage
            title="Branding"
            description="Customize your store's colors, fonts, and styling to match your brand identity perfectly."
            icon={<Palette size={36} />}
        />
    );
}

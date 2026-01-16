import { Globe } from 'lucide-react';
import ProLockedPage from '@/app/components/ProLockedPage';

export default function CustomDomainPage() {
    return (
        <ProLockedPage
            title="Custom Domain"
            description="Connect your own domain like yourstore.com to your dwom storefront for a professional brand experience."
            icon={<Globe size={36} />}
        />
    );
}

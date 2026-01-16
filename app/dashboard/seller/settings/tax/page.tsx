import { FileText } from 'lucide-react';
import ProLockedPage from '@/app/components/ProLockedPage';

export default function TaxInvoicesPage() {
    return (
        <ProLockedPage
            title="Tax & Invoices"
            description="Set up tax calculations for different regions and create professional branded invoices for your customers."
            icon={<FileText size={36} />}
        />
    );
}

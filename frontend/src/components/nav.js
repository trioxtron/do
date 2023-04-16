import { IconChecklist, IconHome, IconSearch } from '@tabler/icons-react';


export default function Nav(props) {
    if (props.site == "main") {
        return (
            <div className='flex justify-between'>
                <IconChecklist className='text-soft-purple' />
            </div>
        );
    } else if (props.site == "archive") {
        return (
            <div className='flex justify-between'>
                <IconHome className='text-soft-purple' />
            </div>
        );
    }
}



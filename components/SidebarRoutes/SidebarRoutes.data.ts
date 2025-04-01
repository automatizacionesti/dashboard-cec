import { BarChart4, Building2, CircleHelpIcon, PanelsTopLeft, Settings, Settings2 } from "lucide-react";

export const dataGeneralSidebar = [
    {
        label: 'Dashboard',
        href: '/Dashboard',
        icon: PanelsTopLeft ,
    },
    {
        label: 'Formulario',
        href: '/Formulario',
        icon: Building2
    },
    {
        label: 'Analitics',
        href: '/settings',
        icon: Settings2 ,
    },
];

export const dataToolSidebar = [
    {
        label: 'Tool1',
        href: '/algo',
        icon: CircleHelpIcon ,
    },
    {
        label: 'Tool2',
        href: '/analytics',
        icon: BarChart4
    },
    
];

export const dataSupportSidebar = [
    {
        label: 'Settings',
        href: '/settings',
        icon: Settings ,
    },
]
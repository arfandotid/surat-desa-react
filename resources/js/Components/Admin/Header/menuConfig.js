// import helper
import hasAnyPermission from "@/Utils/Permission";

// import icons
import {
    FileText,
    Inbox,
    CheckSquare,
    Users,
    UserCog,
    Settings,
    Key,
    Database,
    Shield,
} from "lucide-react";

// Menu items dengan permission check
export const menuItems = [
    {
        name: "Master",
        icon: Database,
        permissions: ["letter-templates.index", "residents.index"],
        dropdown: [
            {
                name: "Master Surat",
                href: "/admin/letter-templates",
                icon: FileText,
                description: "Kelola jenis-jenis surat",
                permissions: ["letter-templates.index"],
            },
            {
                name: "Data Penduduk",
                href: "/admin/residents",
                icon: Users,
                description: "Data warga desa",
                permissions: ["residents.index"],
            },
        ],
    },
    {
        name: "Surat",
        icon: FileText,
        permissions: ["letters.index", "letters-done.index"],
        dropdown: [
            {
                name: "Surat Masuk",
                href: "/admin/letters",
                icon: Inbox,
                description: "Surat yang baru masuk",
                permissions: ["letters.index"],
            },
            {
                name: "Surat Selesai",
                href: "/admin/letter-completeds",
                icon: CheckSquare,
                description: "Surat yang telah selesai",
                permissions: ["letter-completeds.index"],
            },
        ],
    },
    {
        name: "User Management",
        icon: UserCog,
        permissions: ["roles.index", "permissions.index", "users.index"],
        dropdown: [
            {
                name: "Roles",
                href: "/admin/roles",
                icon: Shield,
                description: "Kelola peran pengguna",
                permissions: ["roles.index"],
            },
            {
                name: "Permissions",
                href: "/admin/permissions",
                icon: Key,
                description: "Kelola izin akses",
                permissions: ["permissions.index"],
            },
            {
                name: "Users",
                href: "/admin/users",
                icon: Users,
                description: "Kelola data pengguna",
                permissions: ["users.index"],
            },
        ],
    },
    {
        name: "Settings",
        icon: Settings,
        href: "/admin/settings",
        permissions: ["settings.index"],
        description: "Pengaturan sistem aplikasi",
    },
];

// Filter menu items berdasarkan permission
export const getFilteredMenuItems = () => {
    return menuItems.filter((item) => {
        if (item.permissions && item.permissions.length > 0) {
            return hasAnyPermission(item.permissions);
        }
        return true;
    });
};

// Fungsi untuk filter dropdown items berdasarkan permission
export const getFilteredDropdown = (dropdownItems) => {
    if (!dropdownItems) return [];

    return dropdownItems.filter((subItem) => {
        if (subItem.permissions && subItem.permissions.length > 0) {
            return hasAnyPermission(subItem.permissions);
        }
        return true;
    });
};

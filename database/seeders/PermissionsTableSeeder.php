<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //permission users
        Permission::create(['name' => 'users.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'users.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'users.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'users.delete', 'guard_name' => 'web']);

        //permission roles
        Permission::create(['name' => 'roles.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles.delete', 'guard_name' => 'web']);

        //permission permissions
        Permission::create(['name' => 'permissions.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'permissions.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'permissions.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'permissions.delete', 'guard_name' => 'web']);

        //permission letter-templates
        Permission::create(['name' => 'letter-templates.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'letter-templates.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'letter-templates.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'letter-templates.delete', 'guard_name' => 'web']);

        //permission letters
        Permission::create(['name' => 'letters.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'letters.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'letters.show', 'guard_name' => 'web']);
        Permission::create(['name' => 'letters.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'letters.delete', 'guard_name' => 'web']);

        //permission letter-completeds
        Permission::create(['name' => 'letter-completeds.index', 'guard_name' => 'web']);

        //permission residents
        Permission::create(['name' => 'residents.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'residents.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'residents.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'residents.delete', 'guard_name' => 'web']);

        //permission settings
        Permission::create(['name' => 'settings.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'settings.update', 'guard_name' => 'web']);
    }
}

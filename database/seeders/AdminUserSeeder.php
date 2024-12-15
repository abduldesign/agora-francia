<?php

use Illuminate\Database\Seeder;
use App\Models\User; 
class AdminUserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'agebephilip@gmail.com',
            'password' => bcrypt('Agebe@aga123'),
            'role' => 'admin',
        ]);
    }
}


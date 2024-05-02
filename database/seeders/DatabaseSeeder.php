<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'All User',
            'email' => 'all_user@example.com',
            'password' => bcrypt('12345678'),
        ]);

        Project::factory()
        ->count(30)
        ->hasTasks(30)
        ->create();
    }
}

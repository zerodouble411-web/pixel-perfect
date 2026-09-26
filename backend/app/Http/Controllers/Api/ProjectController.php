<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:120'],
            'category' => ['nullable', 'string', 'max:60'],
            'featured' => ['nullable', 'boolean'],
        ]);

        $key = 'projects:' . md5(json_encode($filters));

        $projects = Cache::tags('projects')->remember($key, now()->addMinutes(10), function () use ($filters) {
            return Project::query()
                ->when($filters['search'] ?? null, function ($query, $search) {
                    $query->where(function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%")
                            ->orWhere('summary', 'like', "%{$search}%")
                            ->orWhereJsonContains('tags', $search);
                    });
                })
                ->when($filters['category'] ?? null, fn ($q, $category) => $q->where('category', $category))
                ->when($filters['featured'] ?? null, fn ($q) => $q->where('featured', true))
                ->orderByDesc('year')
                ->get();
        });

        return ProjectResource::collection($projects);
    }

    public function show(Project $project)
    {
        return new ProjectResource(
            $project->load(['gallery', 'metrics'])
        );
    }
}

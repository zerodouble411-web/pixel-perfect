<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug', 'name', 'category', 'featured', 'year', 'summary', 'image_path',
        'tags', 'problem', 'solution', 'architecture', 'challenges', 'results',
        'timeline', 'code_snippet',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'tags' => 'array',
        'architecture' => 'array',
        'challenges' => 'array',
        'results' => 'array',
        'timeline' => 'array',
        'code_snippet' => 'array',
    ];

    public function getImageUrlAttribute(): ?string
    {
        return $this->image_path ? asset('storage/' . $this->image_path) : null;
    }

    public function metrics(): HasMany
    {
        return $this->hasMany(ProjectMetric::class);
    }

    public function gallery(): HasMany
    {
        return $this->hasMany(ProjectImage::class);
    }
}

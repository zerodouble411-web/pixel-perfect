<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'slug' => $this->slug,
            'name' => $this->name,
            'category' => $this->category,
            'featured' => (bool) $this->featured,
            'year' => (string) $this->year,
            'summary' => $this->summary,
            'image' => $this->image_url,
            'tags' => $this->tags ?? [],
            'problem' => $this->problem,
            'solution' => $this->solution,
            'architecture' => $this->architecture ?? [],
            'challenges' => $this->challenges ?? [],
            'results' => $this->results ?? [],
            'metrics' => $this->whenLoaded('metrics', fn () => $this->metrics->map(fn ($m) => [
                'month' => $m->month,
                'requests' => (int) $m->requests,
                'success' => (float) $m->success_rate,
            ])),
            'timeline' => $this->timeline ?? [],
            'code' => $this->code_snippet ?? null,
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactMessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'email' => ['required', 'email:rfc,dns', 'max:180'],
            'project_type' => ['required', 'string', 'max:80'],
            'budget' => ['nullable', 'string', 'max:80'],
            'message' => ['required', 'string', 'min:12', 'max:5000'],
        ];
    }

    public function messages(): array
    {
        return [
            'message.min' => 'Please describe the project in at least 12 characters.',
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LeaveRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'subject'=>['required'],
            'description'=>['required'],
            'requested_date'=>['required','after_or_equal:today','unique:leaves,requested_date'],
            'to_date'=>['required','after_or_equal:requested_date'],
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Models\User;
use Illuminate\Validation\Rule;

class UserEditRequest extends FormRequest
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
        $userId = $this->route('id');
        return [
            'name' => ['required', 'string', 'max:255'],
            'user_role' => ['required', 'string'],
            'contact_no'=>['required','min:10','max:10'],
            'dob'=>['required'],
            'gender'=>['required'],
            'residential_address'=>['required'],
            'local_address'=>['required'],
            'alt_phone_no'=>['required'],
            'state'=>['required'],
            'city'=>['required'],
            'pin_code'=>['required'],
        ];
    }
}

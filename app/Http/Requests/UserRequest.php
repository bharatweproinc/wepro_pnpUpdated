<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Validation\Rules;
use Illuminate\Foundation\Http\FormRequest;
use Carbon;

class UserRequest extends FormRequest
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

                'name' => ['required','string','max:255'],
                'email' => ['required','string','lowercase','email','max:255','unique:'.User::class],
                'user_role' => ['required','string'],
                'contact_no'=>['required','min:10','max:10'],
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
                'profile' => ['nullable','mimes:jpg,png,jpeg,svg','max:1024'],
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

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $dob = $this->input('dob');

            if ($dob) {
                $age = now()->diffInYears(\Carbon\Carbon::parse($dob));

                if ($age < 18) {
                    $validator->errors()->add('dob', 'The date of birth must be 18 years or older.');
                }
            }
        });
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserPostRequest extends FormRequest
{
    // /**
    //  * Determine if the user is authorized to make this request.
    //  */
    // public function authorize(): bool
    // {
    //     return false;
    // }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            // ユーザー名
            'name' => 'required', // 必須
            // メールアドレス
            'email'     => [
                'required', // 必須
                'unique:users', // ユニーク制約で重複チェック
            ],
        ];
    }

    public function messages()
    {
        return [
          'name.required' => 'ユーザー名は必須です。',
          'email.required'     => 'メールアドレスは必須です。',
          'email.unique'       => 'こちらのメールアドレスはすでに使用されています。',
        ];
    }
}

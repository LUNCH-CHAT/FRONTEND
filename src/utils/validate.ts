export type UserSigninInformation={
    email:string;
}

function validateUser(values:UserSigninInformation){
    const errors={
        email:"",
    }

    if (
        !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(values.email)
    ) {
       errors.email = "올바른 이메일 형식이 아닙니다!" 
    } else if(
        !values.email.endsWith("@ewha.ac.kr") &&
        !values.email.endsWith("@ewhain.net")
    ) {
        errors.email = "이화여대 이메일만 사용 가능합니다"
    }

    

    return errors;
}

function validateSignin(values:UserSigninInformation){
    return validateUser(values);
}

export {validateSignin};
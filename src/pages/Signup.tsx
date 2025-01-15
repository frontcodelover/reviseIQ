import SignupForm from "@/components/auth/signup/signupForm";

function SignUp() {

  return (
    <div className="container mx-auto max-w-sm p-6">
      <h2 className="mb-6 text-center text-2xl font-bold">Inscription</h2>
	  <SignupForm />	
    </div>
  );
}

export default SignUp;

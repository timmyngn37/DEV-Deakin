import { useState, type SubmitEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth, updateAuthUserDisplayName, validateAuthPassword } from '../utils/firebase'

const signupSchema = z.object({
	name: z.string().trim().min(1, 'Name is required'),
	email: z.string().trim().pipe(z.email({ error: 'Please enter a valid email' })),
	password: z.string().min(1, 'Password is required'),
	confirmPassword: z.string(),
}).superRefine((data, ctx) => {
	if (data.password !== data.confirmPassword) {
		ctx.addIssue({
			code: 'custom',
			message: 'Passwords do not match',
			path: ['confirmPassword'],
		})
	}
})

function getPasswordPolicyMessage(passwordStatus: Awaited<ReturnType<typeof validateAuthPassword>>) {
	const requirements = passwordStatus.passwordPolicy.customStrengthOptions

	if (passwordStatus.meetsMinPasswordLength === false) return `Password must be at least ${requirements.minPasswordLength} characters`
	if (passwordStatus.meetsMaxPasswordLength === false) return `Password must be no more than ${requirements.maxPasswordLength} characters`
	if (passwordStatus.containsLowercaseLetter === false) return 'Password must include one lowercase letter'
	if (passwordStatus.containsUppercaseLetter === false) return 'Password must include one uppercase letter'
	if (passwordStatus.containsNumericCharacter === false) return 'Password must include one number'
	if (passwordStatus.containsNonAlphanumericCharacter === false) return 'Password must include one special character'

	return 'Password does not meet the project password policy'
}

function Signup() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [errors, setErrors] = useState<Record<string, string>>({})
	const navigate = useNavigate()

	async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault()
		const result = signupSchema.safeParse({ name, email, password, confirmPassword })

		if (!result.success) {
			const fieldErrors: Record<string, string> = {}
			result.error.issues.forEach((issue) => {
				const field = issue.path[0] as string
				fieldErrors[field] = issue.message
			})
			setErrors(fieldErrors)
			return
		}

		let passwordStatus
		try {
			passwordStatus = await validateAuthPassword(password)
		} catch {
			setErrors({ password: 'Unable to validate the password policy. Please try again.' })
			return
		}

		if (!passwordStatus.isValid) {
			setErrors({ password: getPasswordPolicyMessage(passwordStatus) })
			return
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(email, password)
			navigate('/login')

			try {
				await updateAuthUserDisplayName(user, name)
				await createUserDocFromAuth(user, { displayName: name })
			} catch {
				console.error('Account created, but the user profile could not be saved')
			}
		} catch {
			setErrors({ email: 'An account with this email may already exist' })
		}
	}

	return (
		<div className="auth-page">
			<div className="auth-layout auth-layout-wide">
				<form className="auth-card auth-card-wide" onSubmit={handleSubmit}>
				<h1>Create a DEV@Deakin Account</h1>
				<div className="auth-field">
					<label htmlFor="signup-name">Name</label>
					<input id="signup-name" type="text" value={name} onChange={(event) => setName(event.target.value)} />
					{errors.name && <p className="auth-error">{errors.name}</p>}
				</div>
				<div className="auth-field">
					<label htmlFor="signup-email">Email</label>
					<input id="signup-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
					{errors.email && <p className="auth-error">{errors.email}</p>}
				</div>
				<div className="auth-field">
					<label htmlFor="signup-password">Password</label>
					<input id="signup-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
					{errors.password && <p className="auth-error">{errors.password}</p>}
				</div>
				<div className="auth-field">
					<label htmlFor="signup-confirm-password">Confirm password</label>
					<input id="signup-confirm-password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
					{errors.confirmPassword && <p className="auth-error">{errors.confirmPassword}</p>}
				</div>
				<button className="auth-button" type="submit">Create</button>
				<Link className="auth-switch" to="/login">Login</Link>
				</form>
			</div>
		</div>
	)
}

export default Signup

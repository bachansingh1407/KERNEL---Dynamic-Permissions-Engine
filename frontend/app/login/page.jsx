import EmailLoginForm from "../components/login/EmailLoginForm ";
import QrLogin from "../components/login/QrLogin";

export default function Login() {
    return (
        <div className="min-h-screen bg-slate-200 flex items-center justify-center">

            <div className="max-w-3xl bg-white border border-gray-300 rounded-lg p-6 grid gap-4 grid-cols-1 md:grid-cols-2 ">
                {/* QR LOGIN */}
                <QrLogin />

                {/* EMAIL LOGIN */}
                <div className="px-4 flex flex-col">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-sky-700">
                            Kernel
                        </h1>
                        <p className="text-sm text-slate-600 font-medium tracking-[1px]">
                            Dynamic Permissions Engine
                        </p>
                    </div>

                    <EmailLoginForm />

                    <p className="mt-6 text-xs text-gray-700 font-medium tracking-[1px]">
                        Authorized access only. Contact administrator for credentials.
                    </p>
                </div>
            </div>
        </div>
    )
}
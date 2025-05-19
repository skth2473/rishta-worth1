import { RishtaForm } from "@/components/rishta-form"
import { Heart } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 dark:from-rose-950 dark:to-rose-900 py-10 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <div className="relative">
              <Heart className="h-12 w-12 text-rose-600 fill-rose-600 dark:text-rose-400 dark:fill-rose-400" />
              <Heart className="h-8 w-8 text-rose-500 fill-rose-500 dark:text-rose-300 dark:fill-rose-300 absolute -top-2 -right-4" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-rose-800 dark:text-rose-200 mb-2">RishtaWorth.in</h1>
          <div className="bg-rose-200 text-rose-800 dark:bg-rose-800 dark:text-rose-200 rounded-full px-4 py-1 text-sm inline-block mb-3">
            India's #1 Rishta Value Calculator
          </div>
          <p className="text-rose-600 dark:text-rose-400 italic">Calculate your matrimonial market value!</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-rose-200 dark:border-rose-800">
          <h2 className="text-xl font-semibold text-center text-rose-700 dark:text-rose-300 mb-6">
            👑 Fill in your details to reveal your Rishta Score™
          </h2>

          <RishtaForm />
        </div>

        <div className="mt-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-rose-200 dark:border-rose-800">
          <h3 className="text-lg font-semibold text-center text-rose-700 dark:text-rose-300 mb-4">
            ⭐ Success Stories ⭐
          </h3>

          <div className="space-y-4">
            <div className="p-3 bg-rose-50 dark:bg-rose-950 rounded border border-rose-100 dark:border-rose-900">
              <p className="italic text-rose-800 dark:text-rose-300">
                "My score was 85/100! Three proposals came within a week!"
              </p>
              <p className="text-right text-sm text-rose-600 dark:text-rose-400 mt-1">- Rahul S., Delhi</p>
            </div>

            <div className="p-3 bg-rose-50 dark:bg-rose-950 rounded border border-rose-100 dark:border-rose-900">
              <p className="italic text-rose-800 dark:text-rose-300">
                "As a female with 92/100, my saas treats me like a queen now!"
              </p>
              <p className="text-right text-sm text-rose-600 dark:text-rose-400 mt-1">- Priya M., Mumbai</p>
            </div>

            <div className="p-3 bg-rose-50 dark:bg-rose-950 rounded border border-rose-100 dark:border-rose-900">
              <p className="italic text-rose-800 dark:text-rose-300">
                "My mother-in-law approved me only after seeing my Rishta Score™ certificate!"
              </p>
              <p className="text-right text-sm text-rose-600 dark:text-rose-400 mt-1">- Arjun K., Bangalore</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-rose-600 dark:text-rose-400">
          <p>*This is a satirical tool and not meant to be taken seriously.</p>
          <p className="mt-2 text-xs">
            © Developed By{" "}
            <a href="https://www.linkedin.com/in/sarthak-kumar-thakur-097498231/" className="underline">
              Sarthak Kumar Thakur
            </a>{" "}
            and owned by CopConnectX
          </p>
        </div>
      </div>
    </main>
  )
}

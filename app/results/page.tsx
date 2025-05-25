"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ConfettiDrop } from "@/components/confetti"
import { motion } from "framer-motion"
import { Share2, Download, Trophy, ArrowRight, Heart, Star, Crown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"

interface RishtaData {
  fullName: string
  age: string
  gender: string
  education?: string
  jobType?: string
  income?: string
  vehicle?: string
  homeStatus?: string
  mommyInvolvement?: string
  hairSituation?: string
  complexion: string
  hobbies: string
  cookingSkills?: string
  familyBackground: string
  expectations: string
  score: number
  // Female-specific fields
  cookingExpertise?: string
  saasCompatibility?: string
  devarCompatibility?: string
  nanadCompatibility?: string
  householdSkills?: string
  fashionSense?: string
  makeupSkills?: string
  patienceLevel?: string
  traditionalValues?: string
  karvaChauth?: string
}

export default function ResultsPage() {
  const router = useRouter()
  const [data, setData] = useState<RishtaData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Get data from localStorage
    const storedData = localStorage.getItem("rishtaData")
    if (storedData) {
      setData(JSON.parse(storedData))
    }
    setLoading(false)
  }, [])

  const getVerdict = (score: number, gender: string) => {
    if (gender === "female") {
      if (score >= 90) return "Perfect bahu material – sasural will worship you!"
      if (score >= 80) return "Prime bahu material – saas will be proud."
      if (score >= 70) return "Good prospect – shaadi.com pe profile banao!"
      if (score >= 60) return "Decent catch – but needs some upgrades in cooking."
      if (score >= 50) return "Average – work on your saas compatibility!"
      if (score >= 40) return "Work in progress – mother-in-law disappointed hai."
      return "Beti, focus on household skills first – rishta market tough hai!"
    } else {
      if (score >= 90) return "Elite rishta material – families will fight over you!"
      if (score >= 80) return "Prime rishta material – thoda aur shine karo, mummy will be proud."
      if (score >= 70) return "Good prospect – shaadi.com pe profile banao!"
      if (score >= 60) return "Decent catch – but needs some upgrades."
      if (score >= 50) return "Average joe – government job dhundo jaldi!"
      if (score >= 40) return "Work in progress – mummy disappointed hai."
      return "Beta, focus on career first – rishta market tough hai!"
    }
  }

  const getTip = (data: RishtaData) => {
    if (data.gender === "female") {
      if (data.cookingExpertise !== "expert") return "Improve your cooking skills to boost your score by 15 points!"
      if (data.saasCompatibility !== "excellent") return "Work on your saas compatibility for a 15-point boost!"
      if (data.nanadCompatibility !== "low") return "Lower your chances of conflict with nanad to gain 10 points!"
      if (data.householdSkills !== "expert") return "Improve your household management skills for a 10-point boost!"
      if (data.traditionalValues !== "very-traditional") return "Embrace more traditional values for a 10-point boost!"
      if (data.karvaChauth !== "always") return "Commit to Karva Chauth for a 10-point boost!"
      return "You're almost perfect! Just keep smiling and nodding at your in-laws."
    } else {
      if (data.jobType !== "government") return "Get a government job to boost your social value by 20 points!"
      if (data.vehicle !== "luxury") return "Upgrade your vehicle to impress the in-laws and gain 10 points!"
      if (Number.parseInt(data.income || "0") < 50000)
        return "Increase your income to climb the rishta ladder! Every ₹25,000 adds 5 points!"
      if (data.mommyInvolvement === "low") return "Let your mother make more decisions for maximum rishta points!"
      if (data.complexion !== "fair") return "Fair & Lovely ka jalwa! Improve your complexion for +5 points!"
      return "Keep working on yourself, the perfect rishta is waiting!"
    }
  }

  const getScoreCategory = (score: number) => {
    if (score >= 90) return "Royal Tier"
    if (score >= 80) return "Premium Tier"
    if (score >= 70) return "Gold Tier"
    if (score >= 60) return "Silver Tier"
    if (score >= 50) return "Bronze Tier"
    if (score >= 40) return "Copper Tier"
    return "Struggling Tier"
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-purple-600 dark:bg-purple-700"
    if (score >= 80) return "bg-rose-600 dark:bg-rose-700"
    if (score >= 70) return "bg-amber-500 dark:bg-amber-600"
    if (score >= 60) return "bg-sky-500 dark:bg-sky-600"
    if (score >= 50) return "bg-emerald-500 dark:bg-emerald-600"
    return "bg-slate-500 dark:bg-slate-600"
  }

  const getMarketValue = (score: number, gender: string) => {
    if (gender === "female") {
      if (score >= 90) return "₹50+ Lakh Dowry Demand Potential"
      if (score >= 80) return "₹25-50 Lakh Dowry Demand Potential"
      if (score >= 70) return "₹10-25 Lakh Dowry Demand Potential"
      if (score >= 60) return "₹5-10 Lakh Dowry Demand Potential"
      if (score >= 50) return "₹1-5 Lakh Dowry Demand Potential"
      return "No Dowry Demand Potential"
    } else {
      if (score >= 90) return "₹50+ Lakh Dowry Potential"
      if (score >= 80) return "₹25-50 Lakh Dowry Potential"
      if (score >= 70) return "₹10-25 Lakh Dowry Potential"
      if (score >= 60) return "₹5-10 Lakh Dowry Potential"
      if (score >= 50) return "₹1-5 Lakh Dowry Potential"
      return "No Dowry Potential (You might have to give some)"
    }
  }

  const shareResult = () => {
    if (!data) return

    const text = `I just calculated my Rishta Score™ and I'm ${getScoreCategory(data.score)} with ${data.score}/100 points! Check your score at RishtaWorth.in`

    if (navigator.share) {
      navigator.share({
        title: "My Rishta Score™",
        text: text,
        url: window.location.href,
      })
    } else {
      // Fallback
      navigator.clipboard.writeText(text)
      alert("Result copied to clipboard!")
    }
  }

  const downloadCertificate = () => {
    alert("Your Rishta Score™ Certificate is being prepared! It will be emailed to you shortly.")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 dark:from-rose-950 dark:to-rose-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-700 dark:border-rose-300 mx-auto mb-4"></div>
          <p className="text-rose-700 dark:text-rose-300">Calculating your rishta destiny...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 dark:from-rose-950 dark:to-rose-900 py-10 px-4">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold text-rose-800 dark:text-rose-200 mb-4">No Data Found</h1>
          <p className="mb-6 text-rose-600 dark:text-rose-400">Please complete the form to see your Rishta Score.</p>
          <Button
            onClick={() => router.push("/")}
            className="bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-600 text-white"
          >
            Go to Form
          </Button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 dark:from-rose-950 dark:to-rose-900 py-10 px-4 relative">
      {data && <ConfettiDrop score={data.score} />}

      <div className="max-w-md mx-auto">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <div className="relative">
              <Heart className="h-12 w-12 text-rose-600 fill-rose-600 dark:text-rose-400 dark:fill-rose-400" />
              <Heart className="h-8 w-8 text-rose-500 fill-rose-500 dark:text-rose-300 dark:fill-rose-300 absolute -top-2 -right-4" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-rose-800 dark:text-rose-200 mb-2">RishtaWorth.in</h1>
          <p className="text-rose-600 dark:text-rose-400 italic">Your matrimonial market value, calculated!</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="border-rose-200 dark:border-rose-800 shadow-lg overflow-hidden">
            <CardHeader className={`${getScoreColor(data.score)} text-white rounded-t-lg`}>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl">Rishta Analysis Report™</CardTitle>
                  <CardDescription className="text-white/80">For: {data.fullName}</CardDescription>
                </div>
                <Trophy className="h-12 w-12" />
              </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-6 dark:bg-gray-900">
              <div className="text-center">
                <div className="flex justify-center items-center mb-2">
                  <h3 className="text-3xl font-bold dark:text-white">{data.score}</h3>
                  <span className="text-lg text-gray-500 dark:text-gray-400">/100</span>
                </div>
                <Progress value={data.score} className="h-3 bg-rose-100 dark:bg-rose-950" />
                <div className="mt-2">
                  <Badge className={`${getScoreColor(data.score)} hover:${getScoreColor(data.score)} text-white`}>
                    {getScoreCategory(data.score)}
                  </Badge>
                </div>
              </div>

              <div className="p-4 bg-rose-50 dark:bg-rose-950 rounded-lg border border-rose-200 dark:border-rose-900">
                <div className="flex items-start">
                  <Crown className="h-5 w-5 text-rose-600 dark:text-rose-400 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 dark:text-rose-300">Verdict:</h4>
                    <p className="italic text-lg text-rose-800 dark:text-rose-300">
                      "{getVerdict(data.score, data.gender)}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-rose-50 dark:bg-rose-950 rounded-lg border border-rose-200 dark:border-rose-900">
                <div className="flex items-start">
                  <Star className="h-5 w-5 text-rose-600 dark:text-rose-400 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 dark:text-rose-300">Market Value:</h4>
                    <p className="text-lg font-medium text-rose-800 dark:text-rose-300">
                      {getMarketValue(data.score, data.gender)}
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setShowDetails(!showDetails)}
                variant="outline"
                className="w-full border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-950"
              >
                {showDetails ? "Hide Details" : "Show Detailed Analysis"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <h4 className="font-semibold border-b border-rose-100 dark:border-rose-900 pb-2 dark:text-white">
                    Your Rishta Profile:
                  </h4>

                  {data.gender === "female" ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium block dark:text-rose-300">Age:</span>
                          <span className="dark:text-gray-300">{data.age} years</span>
                        </div>
                        <div>
                          <span className="font-medium block dark:text-rose-300">Complexion:</span>
                          <span className="dark:text-gray-300">
                            {data.complexion.charAt(0).toUpperCase() + data.complexion.slice(1)}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium block dark:text-rose-300">Cooking Expertise:</span>
                          <span className="dark:text-gray-300">
                            {data.cookingExpertise?.charAt(0).toUpperCase() + data.cookingExpertise?.slice(1)}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium block dark:text-rose-300">Household Skills:</span>
                          <span className="dark:text-gray-300">
                            {data.householdSkills?.charAt(0).toUpperCase() + data.householdSkills?.slice(1)}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium block dark:text-rose-300">Traditional Values:</span>
                          <span className="dark:text-gray-300">
                            {data.traditionalValues?.charAt(0).toUpperCase() + data.traditionalValues?.slice(1)}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium block dark:text-rose-300">Karva Chauth:</span>
                          <span className="dark:text-gray-300">
                            {data.karvaChauth?.charAt(0).toUpperCase() + data.karvaChauth?.slice(1)}
                          </span>
                        </div>
                      </div>

                      <h5 className="font-medium text-rose-700 dark:text-rose-300 border-t border-rose-100 dark:border-rose-900 pt-3">
                        In-Law Compatibility:
                      </h5>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium block dark:text-rose-300">Saas Compatibility:</span>
                          <span className="dark:text-gray-300">
                            {data.saasCompatibility?.charAt(0).toUpperCase() + data.saasCompatibility?.slice(1)}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium block dark:text-rose-300">Devar Compatibility:</span>
                          <span className="dark:text-gray-300">
                            {data.devarCompatibility?.charAt(0).toUpperCase() + data.devarCompatibility?.slice(1)}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium block dark:text-rose-300">Nanad Conflict Chance:</span>
                          <span className="dark:text-gray-300">
                            {data.nanadCompatibility?.charAt(0).toUpperCase() + data.nanadCompatibility?.slice(1)}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium block dark:text-rose-300">Patience Level:</span>
                          <span className="dark:text-gray-300">
                            {data.patienceLevel?.charAt(0).toUpperCase() + data.patienceLevel?.slice(1)}
                          </span>
                        </div>
                      </div>

                      <h5 className="font-medium text-rose-700 dark:text-rose-300 border-t border-rose-100 dark:border-rose-900 pt-3">
                        Style & Appearance:
                      </h5>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium block dark:text-rose-300">Fashion Sense:</span>
                          <span className="dark:text-gray-300">
                            {data.fashionSense?.charAt(0).toUpperCase() + data.fashionSense?.slice(1)}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium block dark:text-rose-300">Makeup Skills:</span>
                          <span className="dark:text-gray-300">
                            {data.makeupSkills?.charAt(0).toUpperCase() + data.makeupSkills?.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium block dark:text-rose-300">Age:</span>
                        <span className="dark:text-gray-300">{data.age} years</span>
                      </div>
                      <div>
                        <span className="font-medium block dark:text-rose-300">Education:</span>
                        <span className="dark:text-gray-300">
                          {data.education?.charAt(0).toUpperCase() + data.education?.slice(1)}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium block dark:text-rose-300">Job:</span>
                        <span className="dark:text-gray-300">
                          {data.jobType?.charAt(0).toUpperCase() + data.jobType?.slice(1)}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium block dark:text-rose-300">Income:</span>
                        <span className="dark:text-gray-300">
                          ₹{Number.parseInt(data.income || "0").toLocaleString("en-IN")}/month
                        </span>
                      </div>
                      <div>
                        <span className="font-medium block dark:text-rose-300">Vehicle:</span>
                        <span className="dark:text-gray-300">
                          {data.vehicle?.charAt(0).toUpperCase() + data.vehicle?.slice(1)}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium block dark:text-rose-300">Home:</span>
                        <span className="dark:text-gray-300">{data.homeStatus === "own" ? "Own home" : "Rented"}</span>
                      </div>
                      <div>
                        <span className="font-medium block dark:text-rose-300">Mommy's Boy:</span>
                        <span className="dark:text-gray-300">{data.mommyInvolvement === "high" ? "Yes" : "No"}</span>
                      </div>
                      <div>
                        <span className="font-medium block dark:text-rose-300">Hair:</span>
                        <span className="dark:text-gray-300">
                          {data.hairSituation === "full" ? "Full head of hair" : "Balding/Bald"}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium block dark:text-rose-300">Complexion:</span>
                        <span className="dark:text-gray-300">
                          {data.complexion.charAt(0).toUpperCase() + data.complexion.slice(1)}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium block dark:text-rose-300">Cooking:</span>
                        <span className="dark:text-gray-300">{data.cookingSkills || "Not specified"}</span>
                      </div>
                    </div>
                  )}

                  <div>
                    <span className="font-medium block dark:text-rose-300">Hobbies:</span>
                    <span className="dark:text-gray-300">{data.hobbies}</span>
                  </div>

                  {data.expectations && (
                    <div>
                      <span className="font-medium block dark:text-rose-300">Your Expectations:</span>
                      <span className="dark:text-gray-300">{data.expectations}</span>
                    </div>
                  )}
                </motion.div>
              )}

              <div className="p-4 bg-rose-50 dark:bg-rose-950 rounded-lg border border-rose-200 dark:border-rose-900">
                <div className="flex items-start">
                  <Star className="h-5 w-5 text-rose-600 dark:text-rose-400 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 dark:text-rose-300">🧠 Tip to Improve Your Score:</h4>
                    <p className="dark:text-rose-300">{getTip(data)}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={shareResult}
                  className="bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-600 text-white"
                >
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button
                  onClick={downloadCertificate}
                  variant="outline"
                  className="border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-950"
                >
                  <Download className="mr-2 h-4 w-4" /> Certificate
                </Button>
              </div>
            </CardContent>

            <CardFooter className="flex justify-center bg-rose-50 dark:bg-rose-950 border-t border-rose-200 dark:border-rose-900 p-4">
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-950"
              >
                Try Again
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <div className="text-center mt-6 text-sm text-rose-600 dark:text-rose-400">
          <p>*This is a satirical tool and not meant to be taken seriously.</p>
          <p>Real relationships are based on compatibility, respect, and love.</p>
          <p className="mt-4 text-xs"> © Developed By{" "}
            <a href="https://www.linkedin.com/in/sarthak-kumar-thakur-097498231/" className="underline">
              Sarthak Kumar Thakur
            </a>{" "}
            and owned by CopConnectX</p>
        </div>
      </div>
    </main>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { ChevronRight, ChevronLeft, Crown, Heart, Star, Sparkles } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const formSections = ["personal", "professional", "lifestyle", "appearance", "preferences"]

export function RishtaForm() {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState(0)
  const [formProgress, setFormProgress] = useState(20)
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    education: "",
    jobType: "",
    income: "",
    vehicle: "",
    homeStatus: "",
    mommyInvolvement: "",
    hairSituation: "",
    complexion: "",
    hobbies: "",
    cookingSkills: "",
    familyBackground: "",
    expectations: "",
    // Female-specific fields
    cookingExpertise: "",
    saasCompatibility: "",
    devarCompatibility: "",
    nanadCompatibility: "",
    householdSkills: "",
    fashionSense: "",
    makeupSkills: "",
    patienceLevel: "",
    traditionalValues: "",
    karvaChauth: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const nextSection = () => {
    if (currentSection < formSections.length - 1) {
      setCurrentSection(currentSection + 1)
      setFormProgress((currentSection + 2) * 20)
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
      setFormProgress(currentSection * 20)
    }
  }

  const calculateScore = () => {
    let score = 0

    // Basic scoring for all genders
    const age = Number.parseInt(formData.age)
    if (age >= 25 && age <= 35) score += 15
    else if (age >= 20 && age < 25) score += 10
    else score += 5

    if (formData.gender === "male") {
      // Male scoring
      // Education scoring
      if (formData.education === "phd") score += 20
      else if (formData.education === "masters") score += 15
      else if (formData.education === "bachelors") score += 10
      else score += 5

      // Job scoring
      if (formData.jobType === "government") score += 20
      else if (formData.jobType === "corporate") score += 15
      else if (formData.jobType === "business") score += 10
      else score += 5

      // Income scoring
      const income = Number.parseInt(formData.income)
      if (income >= 100000) score += 20
      else if (income >= 50000) score += 15
      else if (income >= 25000) score += 10
      else score += 5

      // Vehicle scoring
      if (formData.vehicle === "luxury") score += 10
      else if (formData.vehicle === "car") score += 8
      else if (formData.vehicle === "bike") score += 5
      else score += 2

      // Home status
      if (formData.homeStatus === "own") score += 10
      else score += 5

      // Mommy involvement
      if (formData.mommyInvolvement === "high") score += 5
      else score += 3

      // Hair situation
      if (formData.hairSituation === "full") score += 5
      else score += 2

      // Complexion
      if (formData.complexion === "fair") score += 5
      else score += 3

      // Cooking skills
      if (formData.cookingSkills === "expert") score += 5
      else if (formData.cookingSkills === "good") score += 3
      else score += 1
    } else if (formData.gender === "female") {
      // Female-specific scoring

      // Cooking expertise
      if (formData.cookingExpertise === "expert") score += 15
      else if (formData.cookingExpertise === "good") score += 10
      else if (formData.cookingExpertise === "basic") score += 5
      else if (formData.cookingExpertise === "learning") score += 2

      // Saas compatibility
      if (formData.saasCompatibility === "excellent") score += 15
      else if (formData.saasCompatibility === "good") score += 10
      else if (formData.saasCompatibility === "average") score += 5
      else if (formData.saasCompatibility === "challenging") score += 2

      // Devar compatibility
      if (formData.devarCompatibility === "excellent") score += 10
      else if (formData.devarCompatibility === "good") score += 8
      else if (formData.devarCompatibility === "average") score += 5
      else if (formData.devarCompatibility === "challenging") score += 2

      // Nanad compatibility (chances of conflict)
      if (formData.nanadCompatibility === "low") score += 10
      else if (formData.nanadCompatibility === "medium") score += 7
      else if (formData.nanadCompatibility === "high") score += 4
      else if (formData.nanadCompatibility === "very-high") score += 1

      // Household skills
      if (formData.householdSkills === "expert") score += 10
      else if (formData.householdSkills === "good") score += 7
      else if (formData.householdSkills === "average") score += 4
      else if (formData.householdSkills === "basic") score += 2

      // Fashion sense
      if (formData.fashionSense === "trendy") score += 8
      else if (formData.fashionSense === "decent") score += 5
      else if (formData.fashionSense === "traditional") score += 7
      else if (formData.fashionSense === "simple") score += 3

      // Makeup skills
      if (formData.makeupSkills === "professional") score += 7
      else if (formData.makeupSkills === "good") score += 5
      else if (formData.makeupSkills === "basic") score += 3
      else if (formData.makeupSkills === "none") score += 1

      // Patience level
      if (formData.patienceLevel === "very-high") score += 10
      else if (formData.patienceLevel === "high") score += 8
      else if (formData.patienceLevel === "moderate") score += 5
      else if (formData.patienceLevel === "low") score += 2

      // Traditional values
      if (formData.traditionalValues === "very-traditional") score += 10
      else if (formData.traditionalValues === "moderately") score += 7
      else if (formData.traditionalValues === "somewhat") score += 4
      else if (formData.traditionalValues === "modern") score += 2

      // Karva Chauth
      if (formData.karvaChauth === "always") score += 10
      else if (formData.karvaChauth === "sometimes") score += 5
      else if (formData.karvaChauth === "never") score += 0
    }

    return Math.min(score, 100) // Cap at 100
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const score = calculateScore()

    // Store data in localStorage to retrieve on results page
    localStorage.setItem(
      "rishtaData",
      JSON.stringify({
        ...formData,
        score,
      }),
    )

    router.push("/results")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>

      <div className="mb-8">
        <div className="flex justify-between text-xs text-rose-600 dark:text-rose-400 mb-2">
          <span>Start</span>
          <span>Complete</span>
        </div>
        <Progress value={formProgress} className="h-2 bg-rose-100 dark:bg-rose-950" />
        <div className="flex justify-center mt-4">
          <div className="bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100 px-3 py-1 rounded-full text-xs font-medium">
            Step {currentSection + 1} of {formSections.length}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {currentSection === 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center mb-4">
              <Crown className="text-rose-500 dark:text-rose-400 mr-2" size={24} />
              <h3 className="text-lg font-semibold text-rose-800 dark:text-rose-300">Personal Details</h3>
            </div>

            <div className="space-y-3">
              <Label htmlFor="fullName">👤 Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="border-rose-200 focus:ring-rose-500 dark:border-rose-800"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="age">🎂 Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                min="18"
                max="80"
                value={formData.age}
                onChange={handleChange}
                className="border-rose-200 focus:ring-rose-500 dark:border-rose-800"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="gender">👫 Gender</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => handleSelectChange("gender", value)}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male-gender" />
                  <Label htmlFor="male-gender">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female-gender" />
                  <Label htmlFor="female-gender">Female</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label htmlFor="familyBackground">👨‍👩‍👧‍👦 Family Background</Label>
              <Select onValueChange={(value) => handleSelectChange("familyBackground", value)} required>
                <SelectTrigger className="border-rose-200 focus:ring-rose-500 dark:border-rose-800">
                  <SelectValue placeholder="Select family type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="joint">Joint Family</SelectItem>
                  <SelectItem value="nuclear">Nuclear Family</SelectItem>
                  <SelectItem value="business">Business Family</SelectItem>
                  <SelectItem value="traditional">Traditional Family</SelectItem>
                  <SelectItem value="modern">Modern Family</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        )}

        {currentSection === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {formData.gender === "male" ? (
              <>
                <div className="flex items-center justify-center mb-4">
                  <Star className="text-rose-500 dark:text-rose-400 mr-2" size={24} />
                  <h3 className="text-lg font-semibold text-rose-800 dark:text-rose-300">Professional Status</h3>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="education">🎓 Education Level</Label>
                  <Select onValueChange={(value) => handleSelectChange("education", value)} required>
                    <SelectTrigger className="border-rose-200 focus:ring-rose-500 dark:border-rose-800">
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phd">PhD/Doctorate</SelectItem>
                      <SelectItem value="masters">Masters Degree</SelectItem>
                      <SelectItem value="bachelors">Bachelors Degree</SelectItem>
                      <SelectItem value="highschool">High School</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="jobType">💼 Job Type</Label>
                  <Select onValueChange={(value) => handleSelectChange("jobType", value)} required>
                    <SelectTrigger className="border-rose-200 focus:ring-rose-500 dark:border-rose-800">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="government">Government Job (IAS/IPS/PSU)</SelectItem>
                      <SelectItem value="corporate">Corporate Job</SelectItem>
                      <SelectItem value="business">Business Owner</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="engineer">Engineer</SelectItem>
                      <SelectItem value="freelance">Freelancer</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="income">💰 Monthly Income (₹)</Label>
                  <Input
                    id="income"
                    name="income"
                    type="number"
                    min="0"
                    value={formData.income}
                    onChange={handleChange}
                    className="border-rose-200 focus:ring-rose-500 dark:border-rose-800"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="text-rose-500 dark:text-rose-400 mr-2" size={24} />
                  <h3 className="text-lg font-semibold text-rose-800 dark:text-rose-300">Cooking & Household Skills</h3>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="cookingExpertise">👩‍🍳 Cooking Expertise</Label>
                  <Select onValueChange={(value) => handleSelectChange("cookingExpertise", value)} required>
                    <SelectTrigger className="border-rose-200 focus:ring-rose-500 dark:border-rose-800">
                      <SelectValue placeholder="Select your cooking expertise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="expert">Expert (Can cook 50+ dishes)</SelectItem>
                      <SelectItem value="good">Good (Can cook 20-50 dishes)</SelectItem>
                      <SelectItem value="basic">Basic (Can cook 5-20 dishes)</SelectItem>
                      <SelectItem value="learning">Learning (Still learning to cook)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="householdSkills">🧹 Household Management Skills</Label>
                  <Select onValueChange={(value) => handleSelectChange("householdSkills", value)} required>
                    <SelectTrigger className="border-rose-200 focus:ring-rose-500 dark:border-rose-800">
                      <SelectValue placeholder="Select your household skills" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="expert">Expert (Can manage entire household efficiently)</SelectItem>
                      <SelectItem value="good">Good (Can handle most household tasks)</SelectItem>
                      <SelectItem value="average">Average (Can manage basic household tasks)</SelectItem>
                      <SelectItem value="basic">Basic (Still learning household management)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="traditionalValues">🪔 Traditional Values</Label>
                  <Select onValueChange={(value) => handleSelectChange("traditionalValues", value)} required>
                    <SelectTrigger className="border-rose-200 focus:ring-rose-500 dark:border-rose-800">
                      <SelectValue placeholder="How traditional are you?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="very-traditional">Very Traditional (Follow all customs)</SelectItem>
                      <SelectItem value="moderately">Moderately Traditional (Follow most customs)</SelectItem>
                      <SelectItem value="somewhat">Somewhat Traditional (Follow some customs)</SelectItem>
                      <SelectItem value="modern">Modern (Prefer contemporary lifestyle)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </motion.div>
        )}

        {currentSection === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {formData.gender === "male" ? (
              <>
                <div className="flex items-center justify-center mb-4">
                  <Heart className="text-rose-500 dark:text-rose-400 mr-2" size={24} />
                  <h3 className="text-lg font-semibold text-rose-800 dark:text-rose-300">Assets & Lifestyle</h3>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="vehicle">🚗 Vehicle Owned</Label>
                  <Select onValueChange={(value) => handleSelectChange("vehicle", value)} required>
                    <SelectTrigger className="border-rose-200 focus:ring-rose-500 dark:border-rose-800">
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="luxury">Luxury Car (Mercedes/BMW/Audi)</SelectItem>
                      <SelectItem value="car">Regular Car</SelectItem>
                      <SelectItem value="bike">Bike/Scooter</SelectItem>
                      <SelectItem value="none">No Vehicle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="homeStatus">🏠 Home Status</Label>
                  <RadioGroup onValueChange={(value) => handleSelectChange("homeStatus", value)} required>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="own" id="own-home" />
                      <Label htmlFor="own-home">Own Home (Ancestral Property)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bought" id="bought-home" />
                      <Label htmlFor="bought-home">Own Home (Self Purchased)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rent" id="rent-home" />
                      <Label htmlFor="rent-home">Rented</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="cookingSkills">🍳 Cooking Skills</Label>
                  <Select onValueChange={(value) => handleSelectChange("cookingSkills", value)} required>
                    <SelectTrigger className="border-rose-200 focus:ring-rose-500 dark:border-rose-800">
                      <SelectValue placeholder="Select cooking skill level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="expert">Expert Chef</SelectItem>
                      <SelectItem value="good">Good Cook</SelectItem>
                      <SelectItem value="basic">Basic Skills</SelectItem>
                      <SelectItem value="none">Can't Cook / Don't Cook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center mb-4">
                  <Heart className="text-rose-500 dark:text-rose-400 mr-2" size={24} />
                  <h3 className="text-lg font-semibold text-rose-800 dark:text-rose-300">In-Law Compatibility</h3>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="saasCompatibility">👵 Saas (Mother-in-law) Compatibility</Label>
                  <Select onValueChange={(value) => handleSelectChange("saasCompatibility", value)} required>
                    <SelectTrigger className="border-rose-200 focus:ring-rose-500 dark:border-rose-800">
                      <SelectValue placeholder="How well can you adjust with Saas?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent (Will treat her like my own mother)</SelectItem>
                      <SelectItem value="good">Good (Will respect her decisions)</SelectItem>
                      <SelectItem value="average">Average (Will try my best)</SelectItem>
                      <SelectItem value="challenging">Challenging (Might have some conflicts)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="devarCompatibility">👨‍👩‍👧 Devar (Brother-in-law) Compatibility</Label>
                  <Select onValueChange={(value) => handleSelectChange("devarCompatibility", value)} required>
                    <SelectTrigger className="border-rose-200 focus:ring-rose-500 dark:border-rose-800">
                      <SelectValue placeholder="How well can you get along with Devar?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent (Will treat him like my brother)</SelectItem>
                      <SelectItem value="good">Good (Will maintain healthy relationship)</SelectItem>
                      <SelectItem value="average">Average (Will be cordial)</SelectItem>
                      <SelectItem value="challenging">Challenging (Might have some issues)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="nanadCompatibility">👩‍👧 Nanad (Sister-in-law) Compatibility</Label>
                  <Select onValueChange={(value) => handleSelectChange("nanadCompatibility", value)} required>
                    <SelectTrigger className="border-rose-200 focus:ring-rose-500 dark:border-rose-800">
                      <SelectValue placeholder="Chances of conflict with Nanad?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (Will be best friends)</SelectItem>
                      <SelectItem value="medium">Medium (Will try to maintain peace)</SelectItem>
                      <SelectItem value="high">High (Might have frequent disagreements)</SelectItem>
                      <SelectItem value="very-high">Very High (Daily soap drama expected)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="patienceLevel">🧘‍♀️ Patience Level with In-Laws</Label>
                  <Select onValueChange={(value) => handleSelectChange("patienceLevel", value)} required>
                    <SelectTrigger className="border-rose-200 focus:ring-rose-500 dark:border-rose-800">
                      <SelectValue placeholder="Your patience level with in-laws" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="very-high">Very High (Nothing bothers me)</SelectItem>
                      <SelectItem value="high">High (Can tolerate most things)</SelectItem>
                      <SelectItem value="moderate">Moderate (Have my limits)</SelectItem>
                      <SelectItem value="low">Low (Quick to get irritated)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </motion.div>
        )}

        {currentSection === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {formData.gender === "male" ? (
              <>
                <div className="flex items-center justify-center mb-4">
                  <Star className="text-rose-500 dark:text-rose-400 mr-2" size={24} />
                  <h3 className="text-lg font-semibold text-rose-800 dark:text-rose-300">Appearance</h3>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="hairSituation">🧑‍🦲 Hair Situation</Label>
                  <RadioGroup onValueChange={(value) => handleSelectChange("hairSituation", value)} required>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="full" id="full-hair" />
                      <Label htmlFor="full-hair">Full Head of Hair</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="thinning" id="thinning" />
                      <Label htmlFor="thinning">Thinning Hair</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="balding" id="balding" />
                      <Label htmlFor="balding">Balding/Bald</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="styled" id="styled" />
                      <Label htmlFor="styled">Stylishly Bald by Choice</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="complexion">🎨 Skin Complexion</Label>
                  <Select onValueChange={(value) => handleSelectChange("complexion", value)} required>
                    <SelectTrigger className="border-rose-200 focus:ring-rose-500 dark:border-rose-800">
                      <SelectValue placeholder="Select complexion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="veryFair">Very Fair (Milk White)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="hobbies">🎯 Hobbies & Talents</Label>
                  <Textarea
                    id="hobbies"
                    name="hobbies"
                    value={formData.hobbies}
                    onChange={handleChange}
                    className="border-rose-200 focus:ring-rose-500 dark:border-rose-800"
                    placeholder="List your hobbies and special talents"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="text-rose-500 dark:text-rose-400 mr-2" size={24} />
                  <h3 className="text-lg font-semibold text-rose-800 dark:text-rose-300">Appearance & Style</h3>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="fashionSense">👗 Fashion Sense</Label>
                  <Select onValueChange={(value) => handleSelectChange("fashionSense", value)} required>
                    <SelectTrigger className="border-rose-200 focus:ring-rose-500 dark:border-rose-800">
                      <SelectValue placeholder="Your fashion sense" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trendy">Trendy (Always up-to-date with fashion)</SelectItem>
                      <SelectItem value="decent">Decent (Well-dressed but not flashy)</SelectItem>
                      <SelectItem value="traditional">Traditional (Prefer traditional attire)</SelectItem>
                      <SelectItem value="simple">Simple (Comfort over style)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="makeupSkills">💄 Makeup Skills</Label>
                  <Select onValueChange={(value) => handleSelectChange("makeupSkills", value)} required>
                    <SelectTrigger className="border-rose-200 focus:ring-rose-500 dark:border-rose-800">
                      <SelectValue placeholder="Your makeup skills" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional (Could be a makeup artist)</SelectItem>
                      <SelectItem value="good">Good (Can do full makeup for events)</SelectItem>
                      <SelectItem value="basic">Basic (Simple everyday makeup)</SelectItem>
                      <SelectItem value="none">None (Prefer natural look)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="complexion">🎨 Skin Complexion</Label>
                  <Select onValueChange={(value) => handleSelectChange("complexion", value)} required>
                    <SelectTrigger className="border-rose-200 focus:ring-rose-500 dark:border-rose-800">
                      <SelectValue placeholder="Select complexion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="veryFair">Very Fair (Milk White)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="karvaChauth">🌙 Karva Chauth Observance</Label>
                  <Select onValueChange={(value) => handleSelectChange("karvaChauth", value)} required>
                    <SelectTrigger className="border-rose-200 focus:ring-rose-500 dark:border-rose-800">
                      <SelectValue placeholder="Will you observe Karva Chauth?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="always">Always (Will never miss it)</SelectItem>
                      <SelectItem value="sometimes">Sometimes (Depends on circumstances)</SelectItem>
                      <SelectItem value="never">Never (Don't believe in it)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </motion.div>
        )}

        {currentSection === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {formData.gender === "male" ? (
              <>
                <div className="flex items-center justify-center mb-4">
                  <Crown className="text-rose-500 dark:text-rose-400 mr-2" size={24} />
                  <h3 className="text-lg font-semibold text-rose-800 dark:text-rose-300">Preferences & Expectations</h3>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="mommyInvolvement">👩‍👦 Mommy Involvement (Mummy ki pasand matters?)</Label>
                  <RadioGroup onValueChange={(value) => handleSelectChange("mommyInvolvement", value)} required>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high-involvement" />
                      <Label htmlFor="high-involvement">High (Mummy decides everything)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium-involvement" />
                      <Label htmlFor="medium-involvement">Medium (Mummy's opinion matters)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low-involvement" />
                      <Label htmlFor="low-involvement">Low (I make my own decisions)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="expectations">💭 Your Expectations from Partner</Label>
                  <Textarea
                    id="expectations"
                    name="expectations"
                    value={formData.expectations}
                    onChange={handleChange}
                    className="border-rose-200 focus:ring-rose-500 dark:border-rose-800"
                    placeholder="What are you looking for in your ideal match?"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center mb-4">
                  <Crown className="text-rose-500 dark:text-rose-400 mr-2" size={24} />
                  <h3 className="text-lg font-semibold text-rose-800 dark:text-rose-300">Expectations & Hobbies</h3>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="hobbies">🎯 Hobbies & Talents</Label>
                  <Textarea
                    id="hobbies"
                    name="hobbies"
                    value={formData.hobbies}
                    onChange={handleChange}
                    className="border-rose-200 focus:ring-rose-500 dark:border-rose-800"
                    placeholder="List your hobbies and special talents"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="expectations">💭 Your Expectations from Partner</Label>
                  <Textarea
                    id="expectations"
                    name="expectations"
                    value={formData.expectations}
                    onChange={handleChange}
                    className="border-rose-200 focus:ring-rose-500 dark:border-rose-800"
                    placeholder="What are you looking for in your ideal match?"
                    required
                  />
                </div>
              </>
            )}

            <Button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white dark:bg-rose-700 dark:hover:bg-rose-600"
            >
              CALCULATE MY RISHTA SCORE™
            </Button>
          </motion.div>
        )}

        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={prevSection}
            disabled={currentSection === 0}
            className="border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-950"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>

          {currentSection < formSections.length - 1 ? (
            <Button
              type="button"
              onClick={nextSection}
              className="bg-rose-600 hover:bg-rose-700 text-white dark:bg-rose-700 dark:hover:bg-rose-600"
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </form>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import { useWindowSize } from "@/hooks/use-window-size"

interface ConfettiDropProps {
  score: number
}

export function ConfettiDrop({ score }: ConfettiDropProps) {
  const { width, height } = useWindowSize()
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Only show confetti for good scores
  if (score < 70 || !isActive) return null

  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={score * 2}
      colors={["#f43f5e", "#fb7185", "#fda4af", "#fecdd3", "#fff1f2"]}
    />
  )
}
"use client"

import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import { useWindowSize } from "@/hooks/use-window-size"

interface ConfettiDropProps {
  score: number
}

export function ConfettiDrop({ score }: ConfettiDropProps) {
  const { width, height } = useWindowSize()
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Only show confetti for good scores
  if (score < 70 || !isActive) return null

  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={score * 2}
      colors={["#f43f5e", "#fb7185", "#fda4af", "#fecdd3", "#fff1f2"]}
    />
  )
}

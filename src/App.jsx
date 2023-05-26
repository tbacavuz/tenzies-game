import { useEffect, useState } from "react"
import "./App.css"
import Die from "./Components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import { useWindowSize } from "./Hooks/hooks"

export default function App() {
	const { width, height } = useWindowSize()
	const [dice, setDice] = useState(allNewDice())
	const [tenzies, setTenzies] = useState(false)

	useEffect(() => {
		const allHeld = dice.every((die) => die.isHeld)
		const firstValue = dice[0].value
		const allSameValue = dice.every((die) => die.value === firstValue)
		if (allSameValue && allHeld) setTenzies(true)
	}, [dice])

	function generateNewDie() {
		return {
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: nanoid(),
		}
	}

	function allNewDice() {
		const newDice = []
		let times = 10
		while (times--) {
			newDice.push(generateNewDie())
		}
		return newDice
	}

	function rollDice() {
		if (!tenzies) {
			setDice((oldDice) =>
				oldDice.map((oldDie) => {
					if (oldDie.isHeld) return oldDie
					else return generateNewDie()
				})
			)
		} else {
			setTenzies(false)
			setDice(allNewDice)
		}
	}

	function holdDice(id) {
		if (!tenzies) {
			setDice((oldDice) =>
				oldDice.map((oldDie) => {
					if (oldDie.id === id) return { ...oldDie, isHeld: !oldDie.isHeld }
					else return oldDie
				})
			)
		}
	}
	return (
		<main>
			{tenzies && <Confetti width={width} height={height} recycle={false}/>}
			<div className='instructions'>
				<h1>Tenzies</h1>
				<p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
			</div>
			<div className='dice-container'>
				{dice.map((die) => (
					<Die value={die.value} key={die.id} held={die.isHeld} hold={() => holdDice(die.id)} />
				))}
			</div>
			<button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
		</main>
	)
}

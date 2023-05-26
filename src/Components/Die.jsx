/* eslint-disable react/prop-types */
import "./Die.css"

export default function Die(props) {
	return (
		<div onClick={props.hold} className={props.held ? "held die" : "die"}>
			<h2>{props.value}</h2>
		</div>
	)
}

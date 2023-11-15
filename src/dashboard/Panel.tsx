import React from "react";
import { useReplicant } from "../common/useReplicant"
import { FieldForm } from "../common/fieldForm"
import { PlayerStats } from "../common/playerInfo"

export function Panel() {
	const [replValue, updateValue] = useReplicant<number | undefined>(
		"playerId"
	);

	const strValue = replValue ? replValue.toString() : '';

	return (
		<>
			<p>Find your Player ID in the URL after looking yourself up on <a href="https://statmaniax.com/search" target="_blank">statmaniax</a></p>

			<p>Player ID:</p>
			<FieldForm liveValue={strValue} onSubmit={(next) => {
				const asNumber = parseInt(next, 10);
				updateValue(isNaN(asNumber) ? undefined : asNumber)
			}} />

			<PlayerStats />
		</>
	)
}

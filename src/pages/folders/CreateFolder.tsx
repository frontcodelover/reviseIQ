import { useState } from "react"
import CreateDeckForm from "@/components/createDeckForm"

function CreateFolder() {
	const [refreshUserDecks, setRefreshUserDecks] = useState(false)
	
	const handleDeckCreated = () => {
		setRefreshUserDecks(!refreshUserDecks)
	}

	return (
		<>
			<CreateDeckForm onDeckCreated={handleDeckCreated} />
		</>
)
}

export default CreateFolder
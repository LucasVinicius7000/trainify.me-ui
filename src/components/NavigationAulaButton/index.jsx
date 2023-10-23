

export default function NavigationAulaButton({ content, direction = true, onClick }) {
    return <button onClick={onClick} class="bg-indigo-600 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:bg-gray-400">
        <span className="max-[480px]:hidden">{direction && content}</span>
        {direction && <span className="text-2xl">&nbsp;⇒</span>}
        {!direction && <span className="text-2xl">⇐&nbsp;</span>}
        <span className="max-[480px]:hidden">{!direction && content}</span>
    </button>
}
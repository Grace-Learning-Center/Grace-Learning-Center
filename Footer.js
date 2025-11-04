
export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10 footer">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="font-semibold">Grace Learning Center</div>
          <div className="text-sm text-gray-500">Joyful learning beyond the classroom</div>
        </div>
        <div className="text-sm text-gray-500">© {new Date().getFullYear()} Grace Learning Center — All rights reserved.</div>
      </div>
    </footer>
  )
}

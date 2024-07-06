import AuthButton from '../AuthButton'
import ModeToggle from '../ModeToggle'

const HeaderButtons = () => {
  return (
    <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm gap-4">
      {/* auth 버튼 보여주는게 문제. 어떻게 해결하지? */}
      <AuthButton />
      <ModeToggle />
    </div>
  )
}

export default HeaderButtons

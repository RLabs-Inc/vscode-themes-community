export default function Footer() {
  return (
    <footer className="sticky bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="p-2">
        <div className="flex justify-center items-center">
          <p className="text-sm text-foreground">
            &copy; {new Date().getFullYear()} RLabs Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

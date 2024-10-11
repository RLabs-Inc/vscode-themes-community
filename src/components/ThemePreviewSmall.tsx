import { SavedTheme } from '@/lib/types/colors'
import EditorSmall from './EditorSmall'

export default function ThemePreviewSmall({ theme }: { theme: SavedTheme }) {
  return (
    <section className="">
      <div
        className="flex flex-col py-2 m-auto w-full lg:w-1/2 rounded-md"
        style={{ backgroundColor: theme.uiColors.BG1 }}
      >
        <div className="flex h-1 w-full self-center">
          <div
            className="w-10 h-full flex-1"
            style={{
              backgroundColor: theme.uiColors.AC1,
              boxShadow: '0px -7px 10px' + theme.uiColors.AC1,
            }}
          ></div>
          <div
            className="w-full flex-1"
            style={{
              backgroundColor: theme.uiColors.AC2,
              boxShadow: '0px -7px 10px' + theme.uiColors.AC2,
            }}
          ></div>
          <div
            className="w-full flex-1"
            style={{
              backgroundColor: theme.uiColors.FG1,
              boxShadow: '0px -7px 10px' + theme.uiColors.FG1,
            }}
          ></div>
          <div
            className="w-full flex-1"
            style={{
              backgroundColor: theme.syntaxColors.storage,
              boxShadow: '0px -7px 10px' + theme.syntaxColors.storage,
            }}
          ></div>
          <div
            className="w-full flex-1"
            style={{
              backgroundColor: theme.syntaxColors.variable,
              boxShadow: '0px -7px 10px' + theme.syntaxColors.variable,
            }}
          ></div>
        </div>
        <div
          className="flex gap-3 w-full m-auto items-stretch "
          style={{ backgroundColor: theme.uiColors.BG1 }}
        >
          <div
            className="pl-2 py-2 w-1/3 flex flex-col gap-3 items-end justify-center"
            style={{ backgroundColor: theme.uiColors.BG1 }}
          >
            <h2
              className="text-2xl font-bold "
              style={{ color: theme.uiColors.AC1 }}
            >
              {theme.name}
            </h2>

            <h3 className="text-sm" style={{ color: theme.uiColors.FG1 }}>
              {theme.updatedAt.toDateString()}
            </h3>
          </div>

          <div
            className="h-[200px] w-2/3 flex-1 pr-5 py-5 rounded-md"
            style={{ backgroundColor: theme.uiColors.BG1 }}
          >
            <EditorSmall theme={theme} selectedFile="typescript.tsx" />
          </div>
        </div>
        <div className="flex h-1 w-full self-center">
          <div
            className="w-10 h-full flex-1"
            style={{
              backgroundColor: theme.uiColors.AC1,
              boxShadow: '0px 7px 10px' + theme.uiColors.AC1,
            }}
          ></div>
          <div
            className="h-full flex-1"
            style={{
              backgroundColor: theme.uiColors.AC2,
              boxShadow: '0px 7px 10px' + theme.uiColors.AC2,
            }}
          ></div>
          <div
            className="h-full flex-1"
            style={{
              backgroundColor: theme.uiColors.FG1,
              boxShadow: '0px 7px 10px' + theme.uiColors.FG1,
            }}
          ></div>
          <div
            className="h-full flex-1"
            style={{
              backgroundColor: theme.syntaxColors.storage,
              boxShadow: '0px 7px 10px' + theme.syntaxColors.storage,
            }}
          ></div>
          <div
            className="w-full flex-1"
            style={{
              backgroundColor: theme.syntaxColors.variable,
              boxShadow: '0px 7px 10px' + theme.syntaxColors.variable,
            }}
          ></div>
        </div>
      </div>
    </section>
  )
}

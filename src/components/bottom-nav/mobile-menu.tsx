import { h } from "preact";
import { Button } from "ariakit/button";
import { Dialog, useDialogState } from "ariakit/dialog";
import { NAV_LINKS } from "~/constants";

const className =
  "bg-blackA-11 backdrop-blur-sm transition-all duration-500 ease-quick";

interface MobileMenuProps {
  path: string;
}

export default function MobileMenu(props: MobileMenuProps) {
  const { path } = props;
  const dialog = useDialogState();

  return (
    <>
      <Button onClick={dialog.toggle} className="font-bold text-slate-11">
        Menu
      </Button>
      <Dialog backdropProps={{ className: className }} state={dialog}>
        <div className="antialiased shadow-md  absolute top-[40%] left-0 bottom-0 right-0 rounded-t-3xl bg-lo-contrast transition-all duration-300 ease-in-out ">
          <div className="px-2">
            <div className="grid gap-2 py-8">
              <nav className="grid gap-3 text-2xl">
                {NAV_LINKS.map((item, i) => (
                  <a
                    key={item.to}
                    href={item.to}
                    class={path === item.to ? "font-bold theme-txt" : ""}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

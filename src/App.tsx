import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "@/components/ui/toast";
import "./index.css";

import logo from "./logo.svg";

export function App() {
        const sayHello = async () => {
                try {
                        const res = await fetch("/api/hello")
                        const j = await res.json()
                        toast.add({title: j.message})
                } catch(e) {
                        toast.add({title: e.message, type: "error"})
                }
        }


  return (
    <div className="container mx-auto p-8 text-center relative z-10">
      <div className="flex justify-center items-center gap-8 mb-8">
        <img
          src={logo}
          alt="Bun Logo"
          className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] scale-120"
        />
      </div>
      <Card>
        <CardHeader className="gap-4">
          <CardTitle className="text-3xl font-bold">Bun + React</CardTitle>
          <CardDescription>
            Edit <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono">src/App.tsx</code> and save to
            test HMR
          </CardDescription>
        </CardHeader>
        <CardContent>
                <Button onClick={sayHello}>Say Hello</Button>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}

export default App;

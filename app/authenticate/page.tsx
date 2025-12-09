"use client";

import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export default function AuthenticatePage() {
  const { verify2FA, user, loading, error } = useUserStore();

  const [code, setCode] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user) return;

    const ok = await verify2FA(user.email, code);

    if (ok) {
      return;
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Beveiligingscode invoeren
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-6">
            <p className="text-muted-foreground text-center">
              Vul de 6-cijferige verificatiecode in die is verzonden naar{" "}
              <span className="font-medium">{user?.email}</span>.
            </p>

            {error && (
              <Alert variant="destructive">
                <AlertTitle>Ongeldige code</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-center">
              <InputOTP maxLength={6} value={code} onChange={setCode}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button type="submit" className="cursor-pointer" disabled={loading || code.length !== 6}>
              {loading ? <Loader2 className="animate-spin mr-2" /> : null}
              Verifiëren
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
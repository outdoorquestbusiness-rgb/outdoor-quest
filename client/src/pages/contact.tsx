import { useState } from "react";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import mountainBgImage from "@assets/generated_images/Mountain_adventure_family_background_406e0d3d.png";

export default function Contact() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const submitMessage = useMutation({
    mutationFn: async (data: { message: string; language: string }) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: t("send"),
        description: "Message sent successfully!",
      });
      setMessage("");
      // Auto-return to main page after successful message send
      setTimeout(() => {
        setLocation("/");
      }, 2000);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      submitMessage.mutate({ message, language: "fr" });
    }
  };

  return (
    <div 
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${mountainBgImage})` 
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-4">
        <button
          onClick={() => setLocation("/")}
          className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
          data-testid="button-back"
        >
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        <h2 className="text-2xl font-bold text-white drop-shadow-lg">{t("contact.title")}</h2>
        <div className="w-10"></div>
      </div>

      {/* Contact Form */}
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-forest" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              {t("contact.team")}
            </h3>
            <p className="text-slate-600">{t("contact.feedback")}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t("your.message")}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-32 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-forest/20 focus:border-forest resize-none"
                placeholder={t("write.message")}
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitMessage.isPending || !message.trim()}
              className="w-full bg-forest hover:bg-forest/90 disabled:bg-slate-300 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
            >
              {submitMessage.isPending ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending...
                </div>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2 inline" />
                  {t("send")}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

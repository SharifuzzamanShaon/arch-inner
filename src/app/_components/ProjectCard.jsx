import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

const ProjectCard = ({ project }) => {
  const maskStyles = {
    maskImage: `url("data:image/svg+xml,%3Csvg width='571' height='503' viewBox='0 0 571 503' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M571 421C571 434.255 560.255 445 547 445H436C416.118 445 400 461.118 400 481C400 493.15 390.15 503 378 503H24C10.7452 503 0 492.255 0 479V24C0 10.7452 10.7452 0 24 0H547C560.255 0 571 10.7452 571 24V421Z' fill='black'/%3E%3C/svg%3E")`,
    maskSize: "100% 100%",
    maskRepeat: "no-repeat",
    WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='571' height='503' viewBox='0 0 571 503' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M571 421C571 434.255 560.255 445 547 445H436C416.118 445 400 461.118 400 481C400 493.15 390.15 503 378 503H24C10.7452 503 0 492.255 0 479V24C0 10.7452 10.7452 0 24 0H547C560.255 0 571 10.7452 571 24V421Z' fill='black'/%3E%3C/svg%3E")`,
    WebkitMaskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
  };
  return (
    <div className="relative w-full group max-w-[571px] mx-auto">
      <Card
        className="relative flex min-h-[420px] lg:min-h-[500px] flex-col justify-between border-none bg-[#2B1411] text-white shadow-xl overflow-hidden"
        style={maskStyles}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={project?.image}
            alt={project?.title || "Project"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority
            unoptimized
          />
        </div>
        <div className="flex items-start justify-between px-4 sm:px-6 pt-16 xl:pt-6 relative z-10">
          <Badge className="rounded-full bg-white/10 backdrop-blur-md px-3 sm:px-4 py-1 text-[10px] sm:text-xs text-white border-none">
            {project?.category || "Interior"}
          </Badge>
          <div className="flex items-start gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-[10px] sm:text-xs text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FE5443] animate-pulse" />
            {project?.location || "Dhaka"}
          </div>
        </div>

        <CardContent className="relative z-10 mt-auto px-4 sm:px-6 pb-16 sm:pb-20 lg:pb-24 pt-0">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 leading-tight text-left">
            {project?.title || "Modern Living"}
          </h3>
          <p className="text-xs sm:text-sm text-white/80 line-clamp-2 max-w-[85%] text-left">
            {project?.description ||
              "A beautiful blend of modern aesthetics and functional design."}
          </p>
        </CardContent>
      </Card>
      <div className="absolute top-[80%] md:top-[82.5%] xl:top-[90%] right-[1%] md:right-[-2%] xl:right-[2%] z-20 p-1">
        <Button className="flex items-center gap-3 rounded-full bg-[#FE5443] h-8 sm:h-10 px-4 text-xs sm:text-sm font-bold text-white shadow-2xl hover:bg-[#ff6657] transition-all active:scale-95">
          <span className="hidden lg:inline">View Project</span>
          <span className="lg:hidden">View</span>
          <FaArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;

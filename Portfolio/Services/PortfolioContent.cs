using Portfolio.Models;

namespace Portfolio.Services;

public static class PortfolioContent
{
    public static PortfolioData Get()
    {
        // Intentionally simple and easy to edit.
        // If you want, we can move this into JSON under wwwroot/data later.

        return new PortfolioData(
            Person: new Person(
                FullName: "Zbyněk Novák",
                Title: "Head of .NET | Full Stack Developer",
                Phone: "+420 777 941 812",
                Email: "novak.zbynek@outlook.com",
                Location: "Liberec, Czech Republic",
                AboutHtml:
                "With over a decade of experience in the .NET ecosystem, I have evolved from a core developer into a technical leader dedicated to building complex software systems and high-performing engineering departments.<br/><br/>" +
                "I value clean, readable, high-quality code and prioritize deep work and continuous learning. I am never satisfied with stagnation; I strive to extract new growth from every project to move my skills forward.<br/><br/>" +
                "Currently heading the .NET department at Applifting, I specialize in leadership, mentoring, and team growth, with a specific focus on evolving our development lifecycle through strategic AI integration.",
                Links: new Links(
                    LinkedInUrl: null,
                    GitHubUrl: null
                ),
                AvatarImagePath: "/avatarFoto.jpg",
                ResumeDownloadPath: "/resume/Zbynek-Novak-Resume.pdf"
            ),
            Experience: new List<ExperienceItem>
            {
                new(
                    Company: "Applifting",
                    Role: "Head of .NET / Tech Lead",
                    Dates: "2024 – Present",
                    Bullets: new List<string>
                    {
                        "Strategic management and leadership of the entire .NET department",
                        "Managing resource allocation, hiring processes, and team scaling",
                        "Defining and implementing competency models for developer career paths",
                        "Driving AI adoption by evaluating and integrating tools like GitHub Copilot and JetBrains AI into departmental workflows",
                        "Mentoring colleagues on effective AI-assisted development and modern engineering practices"
                    }
                ),
                new(
                    Company: "Applifting",
                    Role: "Full Stack Developer",
                    Dates: "2024 – Present",
                    Bullets: new List<string>
                    {
                        "Developing modern web applications using Blazor and .NET",
                        "Leading the modernization of legacy on-premise applications into low-maintenance cloud solutions",
                        "Performing comprehensive technical audits for various projects",
                        "Ensuring high architectural standards and performance optimization"
                    }
                ),
                new(
                    Company: "Eria Labs",
                    Role: "Tech Lead",
                    Dates: "2022 – 2024",
                    Bullets: new List<string>
                    {
                        "Analyzed and architected complex software systems",
                        "Led multiple development teams and ensured delivery excellence",
                        "Mentored junior developers and fostered a culture of growth",
                        "Prepared and conducted technical training sessions"
                    }
                ),
                new(
                    Company: "Eria Labs",
                    Role: "CTO",
                    Dates: "2022 – 2023",
                    Bullets: new List<string>
                    {
                        "Managed technical-business communication with key stakeholders",
                        "Oversaw the technical department consisting of 5 specialized teams",
                        "Executed crisis management and strategic problem-solving",
                        "Analyzed and prepared technical roadmaps for new projects"
                    }
                ),
                new(
                    Company: "Eria Labs",
                    Role: "Full Stack Developer & Management",
                    Dates: "2021 – 2024",
                    Bullets: new List<string>
                    {
                        "Developed scalable solutions using serverless technologies",
                        "Built responsive frontend applications using Vue.js",
                        "Managed DevOps workflows, resource provisioning, and deployment",
                        "Worked within Agile/Scrum methodologies"
                    }
                ),
                new(
                    Company: "Winfo s.r.o",
                    Role: "Full Stack .NET C# WPF Developer",
                    Dates: "2016 – 2021",
                    Bullets: new List<string>
                    {
                        "Designed and developed applications for data processing and transformation",
                        "Built data visualization tools and statistical dashboards",
                        "Optimized data export and reporting engines"
                    }
                )
            },
            Education: new List<EducationItem>
            {
                new(
                    School: "Technical University of Liberec",
                    Summary: "Bachelor's degree, Information Technology • 2014 – 2019",
                    Details: new List<string>
                    {
                        "Thesis — Neural networks for automatic log detection in images"
                    }
                )
            },
            Strengths: new List<StrengthItem>
            {
                new("🚀", "Tech Leadership"),
                new("🤖", "AI Strategy"),
                new("🧠", "Department Management"),
                new("💎", "Deep Work"),
                new("⚡", "Rapid Learning")
            },
            Hobbies: new List<HobbyItem>
            {
                new("🚴", "Cycling & Sports"),
                new("🧩", "3D Printing & Modeling"),
                new("📚", "Reading & Self-Education"),
                new("🍎", "Cooking & Baking"),
                new("⛰", "Camping & Hiking"),
            },
            ExpertSkills: new SkillGroup(
                LevelTitle: "Expert",
                Skills: new List<string>
                {
                    "Leadership & Mentoring",
                    "C#",
                    ".NET",
                    "Department Management",
                    "Microsoft Azure",
                    "SQL",
                    "Git",
                    "Data Analytics"
                }
            ),
            AdvancedSkills: new SkillGroup(
                LevelTitle: "Advanced",
                Skills: new List<string>
                {
                    "Software Architecture",
                    "Blazor",
                    "Cloud Migration",
                    "AI Tools (Copilot, Rider AI)",
                    "Technical Auditing",
                    "Vue.js",
                    "DevOps",
                    "AWS",
                    "Docker",
                    "Python",
                    "Unit Testing"
                }
            ),
            Languages: new LanguageSkills(
                NativeLabel: "Czech",
                NativeLevelDots: 5,
                SecondaryLabel: "English",
                SecondaryLevelDots: 4
            )
        );
    }
}
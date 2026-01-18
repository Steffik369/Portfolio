namespace Portfolio.Models;

public sealed record PortfolioData(
    Person Person,
    IReadOnlyList<ExperienceItem> Experience,
    IReadOnlyList<EducationItem> Education,
    IReadOnlyList<StrengthItem> Strengths,
    IReadOnlyList<HobbyItem> Hobbies,
    SkillGroup ExpertSkills,
    SkillGroup AdvancedSkills,
    LanguageSkills Languages
);

public sealed record Person(
    string FullName,
    string Title,
    string Phone,
    string Email,
    string Location,
    string AboutHtml,
    Links Links,
    string? AvatarImagePath,
    string ResumeDownloadPath
);

public sealed record Links(
    string? LinkedInUrl,
    string? GitHubUrl
);

public sealed record ExperienceItem(
    string Company,
    string Role,
    string Dates,
    IReadOnlyList<string> Bullets
);

public sealed record EducationItem(
    string School,
    string Summary,
    IReadOnlyList<string> Details
);

public sealed record StrengthItem(string Icon, string Title);
public sealed record HobbyItem(string Icon, string Title);

public sealed record SkillGroup(string LevelTitle, IReadOnlyList<string> Skills);

public sealed record LanguageSkills(
    string NativeLabel,
    int NativeLevelDots,
    string SecondaryLabel,
    int SecondaryLevelDots
);
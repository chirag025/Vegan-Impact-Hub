
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, BookOpen, Lock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

type StoryEntry = {
  id: string;
  title: string;
  content: string;
  unlockLevel: number;
  image?: string;
};

type StoryData = {
  [key: string]: StoryEntry[];
};

const CompanionStory = () => {
  const [companionData, setCompanionData] = useState<any>(null);
  const [currentStoryId, setCurrentStoryId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const { toast } = useToast();

  // Story data organized by animal species
  const storyData: StoryData = {
    Cow: [
      {
        id: "intro",
        title: "Bella's Journey Begins",
        content: "Bella was born on a dairy farm. As a female calf, she was destined for the same life as her mother - constant pregnancy, having her babies taken away, and producing milk until her body gave out.\n\nBut fate had other plans. When Bella was just 3 months old, the farm was investigated for animal welfare violations. The conditions were so poor that authorities intervened, and Bella, along with several other cows, was rescued.\n\nNow, Bella lives at a sanctuary where she can roam freely, form natural social bonds, and most importantly, never be separated from any calves she might have in the future.",
        unlockLevel: 1,
        image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "growing",
        title: "Growing Strong",
        content: "With proper nutrition and care, Bella has grown from a shy, hesitant calf into a confident young cow. The sanctuary staff noticed how she would watch visitors from a distance at first, but never approach.\n\nSlowly, with gentle encouragement and positive experiences, she began to trust humans again. Now, she's often the first cow to greet visitors at the fence, gently nuzzling their hands for treats or scratches.\n\nBella particularly enjoys having her neck scratched and will often tilt her head when someone approaches, silently asking for this small pleasure that was denied to her in her previous life.",
        unlockLevel: 2
      },
      {
        id: "friendship",
        title: "An Unexpected Friendship",
        content: "One morning, the sanctuary welcomed a new resident - a nervous pig named Oliver who had been rescued from a factory farm. While the other animals kept their distance from the newcomer, Bella approached the fence separating their areas and stood there quietly.\n\nSanctuary staff were amazed to see Oliver gradually move closer to Bella. By the end of the day, the two were resting on opposite sides of the fence, but clearly keeping each other company.\n\nTheir unlikely friendship blossomed, and today they often graze in adjacent fields, finding comfort in each other's presence despite their different species. Both seem to recognize something in the other - perhaps the shared experience of having been saved.",
        unlockLevel: 3
      },
      {
        id: "freedom",
        title: "The Joy of Freedom",
        content: "Today marks one year since Bella's rescue. The sanctuary staff decided to celebrate by opening up a new field area that's been prepared especially for the cows.\n\nWhen the gates were opened, something magical happened. Bella, normally calm and deliberate in her movements, suddenly kicked up her heels and ran, leaping and bucking with pure joy. The staff call this behavior 'zoomies' - a physical expression of happiness that many rescued farm animals display when they realize they're truly free.\n\nFor those who witnessed it, there was no question that Bella was celebrating her freedom, expressing emotions that many people don't realize cows can feel. In this moment, the connection between humans like you, making compassionate choices, and Bella's new life, became beautifully clear.",
        unlockLevel: 4,
        image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "mother",
        title: "Becoming a Mother",
        content: "The day that truly transformed Bella came when she gave birth to her first calf at the sanctuary. Unlike on the dairy farm, where calves are typically separated from their mothers within 24 hours of birth, Bella got to keep and nurture her baby.\n\nSanctuary visitors watched in awe as Bella meticulously cleaned her newborn, gently nudged him to stand, and protectively positioned herself between her calf and any perceived threats. When her baby took his first wobbly steps and successfully nursed, Bella's contentment was palpable.\n\nThis natural mother-calf bond, denied to millions of dairy cows worldwide, continues to strengthen each day. Bella's calf will never know the fear of separation, and Bella herself seems to have found her purpose in motherhood - a role she was born to fulfill but would have been perverted in the dairy industry into an endless cycle of loss and grief.",
        unlockLevel: 5
      }
    ],
    Pig: [
      {
        id: "intro",
        title: "Oliver's Rescue Story",
        content: "Oliver was born in a massive industrial farm facility that housed thousands of pigs in cramped, filthy conditions. As a piglet, he never felt the warmth of the sun, the coolness of mud, or even had enough space to turn around comfortably.\n\nWhen a severe storm damaged part of the facility, some pigs escaped, including Oliver. He was found wandering, confused and frightened, by a local animal sanctuary volunteer who was helping with storm recovery efforts.\n\nThough initially extremely fearful of humans, Oliver was brought to the sanctuary where patient caregivers slowly earned his trust. Today, this intelligent, curious pig enjoys a life where he can express his natural behaviors and personality.",
        unlockLevel: 1,
        image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "exploration",
        title: "The World Outside",
        content: "For the first few weeks at the sanctuary, Oliver refused to leave his shelter. The open space seemed to frighten him after a lifetime of confinement.\n\nSanctuary staff placed treats in a trail leading outside, and day by day, Oliver ventured a little further. The first time he stepped fully outside and felt grass under his hooves, he froze, apparently processing this entirely new sensation.\n\nNow, Oliver spends hours each day exploring every inch of his habitat. He's particularly fascinated by the small creek that runs through the property, and has learned to use his snout to turn over rocks and find the tiny creatures living underneath - a natural foraging behavior that he was never able to express before.",
        unlockLevel: 2
      },
      {
        id: "intelligence",
        title: "A Remarkable Intelligence",
        content: "The sanctuary staff quickly realized that Oliver was extremely intelligent and needed mental stimulation. They introduced puzzle feeders that require him to figure out how to access treats hidden inside.\n\nTo everyone's surprise, Oliver mastered even the most complex puzzles within days. He also learned to recognize each caregiver by name and would respond differently depending on who called him.\n\nResearchers who study animal cognition have found that pigs are among the smartest animals on earth - comparable to dogs and even three-year-old human children in many cognitive tests. Oliver's quick learning and problem-solving abilities are a powerful reminder of the complex minds that exist in animals many people think of only as food.",
        unlockLevel: 3
      },
      {
        id: "friendship",
        title: "Finding His Herd",
        content: "Pigs are highly social animals, and in the wild, they live in family groups called sounders. At the sanctuary, Oliver was initially kept separate from other pigs while he adjusted to his new environment.\n\nWhen the time came to introduce him to the sanctuary's small pig community, the staff worried that there might be conflicts. Instead, they witnessed something beautiful. A older sow named Rosie immediately approached Oliver, gently sniffed him, and then led him to the group's favorite mud wallow.\n\nBy the end of the day, Oliver was lying contentedly in the sun with his new friends, engaging in mutual grooming behavior that's essential for pig social bonding. From being alone in a metal crate to finding his place in a proper pig society, Oliver's transformation was complete.",
        unlockLevel: 4,
        image: "https://images.unsplash.com/photo-1593179357196-278b2563f499?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "advocacy",
        title: "Oliver's Legacy",
        content: "Today, Oliver serves as an ambassador for the billions of pigs still confined in factory farms worldwide. Visitors to the sanctuary often comment that they had no idea pigs were so intelligent, clean (they never soil their sleeping areas when given enough space), and affectionate.\n\nMany people, after meeting Oliver and hearing his story, decide to reconsider their food choices. The sanctuary now hosts regular educational events where people can learn about the cognitive and emotional lives of farm animals and the reality of modern animal agriculture.\n\nThrough your compassionate choices, you're helping create a world where more animals like Oliver can live according to their true natures rather than as units in an industrial system. Oliver may never know you personally, but his life has been transformed by the collective impact of individual decisions like yours.",
        unlockLevel: 5
      }
    ],
    Chicken: [
      {
        id: "intro",
        title: "Luna's Road to Recovery",
        content: "Luna spent the first year of her life in a battery cage at an egg farm, crammed into a space smaller than a sheet of paper with several other hens. She never spread her wings, felt the sun, or scratched at the earth – all natural behaviors that chickens need for physical and psychological wellbeing.\n\nWhen the farm went bankrupt, an animal sanctuary stepped in to rescue as many hens as possible. Luna was among them, though she was in terrible condition – missing most of her feathers, with a deformed beak from being 'trimmed' (a painful procedure done without anesthesia), and suffering from severe osteoporosis due to the unnatural number of eggs her body had been forced to produce.\n\nAt the sanctuary, Luna began her long road to recovery. Free from the stress and confinement of the cage, her body and spirit slowly began to heal.",
        unlockLevel: 1,
        image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "healing",
        title: "Healing Begins",
        content: "The first priority for Luna's caregivers was addressing her physical health. She was severely malnourished, as laying hens are often fed only enough to maximize egg production, not for their overall wellbeing.\n\nThe sanctuary veterinarian started Luna on a specialized diet rich in calcium to help reverse her bone weakness. She was given supplements to help regrow her feathers, and pain medication to ease the discomfort from years of standing on wire cage floors.\n\nThough initially too weak to walk properly, with patient rehabilitation, Luna gradually gained strength. The first time she took a dust bath – a natural behavior where chickens clean their feathers and rid themselves of parasites – the sanctuary staff celebrated this small but significant victory in her recovery journey.",
        unlockLevel: 2
      },
      {
        id: "discovery",
        title: "Discovering Her Nature",
        content: "As Luna's physical health improved, her caregivers began to see her personality emerge. Having spent her entire life in a cage, she had to learn how to be a chicken.\n\nThe sanctuary paired her with a mentor – an older hen named Penny who had been rescued from a similar situation years earlier and had fully adjusted to sanctuary life. From Penny, Luna learned how to forage for food, find the best spots for dust baths, and navigate the social hierarchy of the chicken flock.\n\nOne spring morning, the staff found Luna attempting to build a nest – another natural behavior she'd never been able to express before. Though she wasn't very good at it yet, this was a powerful sign that Luna was reconnecting with her innate chicken nature despite her traumatic start to life.",
        unlockLevel: 3
      },
      {
        id: "confidence",
        title: "Growing Confidence",
        content: "After six months at the sanctuary, Luna was nearly unrecognizable from the frightened, featherless hen who had arrived. Her feathers had grown back in a beautiful pattern of warm browns and golds, and she had developed a confident strut as she explored the sanctuary grounds.\n\nLuna particularly enjoyed following the groundskeeper as he worked, knowing that his digging would unearth worms and insects for her to find. She developed a distinctive happy chirp that she used when she found something especially delicious or when her favorite caregivers approached.\n\nVisitors to the sanctuary were often surprised by how personable Luna had become. Many commented that they had never thought of chickens as having individual personalities or the capacity for such a range of emotions and behaviors. Luna became a living testament to what becomes possible when these intelligent birds are allowed to live according to their natural instincts.",
        unlockLevel: 4,
        image: "https://images.unsplash.com/photo-1492975676866-a40de10e78f6?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "new_life",
        title: "A New Life Purpose",
        content: "Today, Luna has found a new purpose far removed from her former existence as an egg-laying machine. The sanctuary uses a technique called 'chicken therapy' where rescue hens interact with children and adults dealing with anxiety, depression, and trauma. The simple act of sitting quietly with the chickens, gently stroking their feathers, and listening to their soft clucking has proven remarkably effective for many visitors.\n\nLuna, with her gentle disposition and apparent comfort around humans, has become a favorite therapy chicken. The children especially love her, and she seems to respond positively to their energy, often choosing to settle near groups of young visitors.\n\nFrom a life of exploitation and suffering, Luna has transformed into a healer helping humans connect with the natural world and animal kingdom in a meaningful way. Her journey stands as a powerful example of resilience, and of the extraordinary connection that's possible between humans and animals when that relationship is based on respect rather than exploitation.",
        unlockLevel: 5
      }
    ],
    Goat: [
      {
        id: "intro",
        title: "Charlie's Second Chance",
        content: "Charlie was born at a petting zoo where animals were viewed primarily as entertainment for humans, with little regard for their specific needs. As a naturally playful and climbing-oriented species, goats require mental stimulation and vertical space to thrive – neither of which Charlie had access to.\n\nWhen visitors weren't around, the animals were kept in small, barren pens. Charlie became malnourished and developed behavioral issues from the stress and boredom. When the petting zoo went out of business, the owner simply abandoned the animals.\n\nFortunately, a network of farm animal sanctuaries coordinated a rescue effort. Charlie, along with several other goats, sheep, and chickens, was brought to a sanctuary that specializes in creating natural environments for formerly captive farm animals.",
        unlockLevel: 1,
        image: "https://images.unsplash.com/photo-1438565434616-3ef039228b15?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "rehabilitation",
        title: "The Path to Rehabilitation",
        content: "When Charlie first arrived at the sanctuary, his physical condition was poor. He was underweight, his hooves were overgrown and painful, and his coat was dull and patchy. The sanctuary's veterinarian discovered he also had a significant parasite load – common in environments where animals are kept in overcrowded, unsanitary conditions.\n\nOver several months, Charlie received treatment for his various health issues. His diet was corrected with proper goat nutrition, his hooves were trimmed and treated, and he was given medication for the parasites.\n\nBut perhaps more important than the physical treatment was addressing Charlie's psychological needs. The sanctuary staff created an enriched environment with platforms for climbing, bridges, and even old playground equipment repurposed for goat enjoyment. Slowly, Charlie began to show interest in his surroundings and started displaying natural goat behaviors like climbing and playfully headbutting with other goats.",
        unlockLevel: 2
      },
      {
        id: "playfulness",
        title: "Rediscovering Joy",
        content: "As Charlie's health improved, his natural playfulness emerged – a trait that goats are well-known for but that had been suppressed in his previous life. Sanctuary staff would often find him inventing games, like balancing on logs or challenging other goats to what looked remarkably like tag.\n\nOne of Charlie's favorite activities became what the sanctuary staff called 'king of the mountain.' The sanctuary had built a multi-level goat platform, and Charlie would climb to the top and playfully defend his position from other goats trying to take the prime spot.\n\nVisitors to the sanctuary were delighted by Charlie's antics, but the staff made sure to educate them about the difference between enjoying animals in their natural state versus keeping them in unnatural environments for human entertainment. Charlie's story helped many visitors understand the importance of seeing animals as beings with their own needs and preferences rather than as objects for human amusement.",
        unlockLevel: 3
      },
      {
        id: "friendship",
        title: "An Unlikely Bond",
        content: "About a year after Charlie's arrival, the sanctuary rescued a lamb named Lily who had escaped from a transport truck headed to a slaughterhouse. Lily was terrified of humans and other animals alike, having never experienced kindness from either.\n\nThe sanctuary staff tried various ways to help Lily feel safe, but she remained fearful and withdrawn. Then, something unexpected happened. Charlie, who by this time had become quite confident and social, took an interest in the frightened lamb.\n\nStaff observed Charlie lying near Lily's hiding spots, not forcing interaction but simply being present. Gradually, Lily began to follow Charlie around the pasture. Charlie seemed to understand Lily's fear and would position himself between her and any perceived threats. Within weeks, the two became inseparable – eating together, sleeping side by side, and even playing together as Lily gained confidence.\n\nThis cross-species friendship became a powerful example of the emotional complexity of animals that are often dismissed as simple livestock.",
        unlockLevel: 4,
        image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "teacher",
        title: "Charlie the Teacher",
        content: "Today, Charlie has taken on an unexpected role at the sanctuary – that of an educator. The sanctuary runs a program for at-risk youth, where teenagers dealing with behavioral issues or difficult home situations come to learn about animal care and empathy.\n\nCharlie, with his playful nature and history of overcoming adversity, has become a favorite among these young visitors. The sanctuary staff noticed that even the most withdrawn teens would often open up when working with Charlie, sharing their thoughts and feelings while brushing him or helping to prepare his food.\n\nOne program coordinator noted that Charlie seems to have a special affinity for children who have experienced trauma – as if he can sense a kindred spirit. Through caring for Charlie and learning his story, many young people have found a new sense of purpose and developed empathy not just for animals, but for other humans as well.\n\nFrom a neglected petting zoo attraction to a healer and teacher, Charlie's journey illustrates the profound impact that compassionate choices can have – not just on animal lives, but on human lives as well. Every meal choice that reduces demand for animal products helps create a world where more animals like Charlie can fulfill their potential as the complex, emotional beings they truly are.",
        unlockLevel: 5
      }
    ],
    Sheep: [
      {
        id: "intro",
        title: "Daisy's Narrow Escape",
        content: "Daisy was born on a wool farm where sheep are valued primarily for their fleece and eventually sent to slaughter when their wool production declines. Like many modern sheep breeds, she was genetically selected to produce an unnaturally large amount of wool – so much that, without human shearing, it can cause suffering and even death.\n\nWhen Daisy was about five years old, the farm decided she was no longer profitable enough and scheduled her for slaughter. But fate intervened when a sanctuary worker visiting the sale yard noticed her labored breathing and severe discomfort. Daisy had not been sheared for over a year, and the weight of her overgrown wool was causing heat stress and making it difficult for her to move.\n\nThe sanctuary negotiated for Daisy's release, and she was brought to her new home – barely able to walk and frightened of human contact after years of rough handling.",
        unlockLevel: 1,
        image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "transformation",
        title: "A Transformative Shearing",
        content: "Upon Daisy's arrival at the sanctuary, the most urgent priority was addressing her overgrown fleece. The staff called in an experienced sheep shearer who specialized in working with rescue animals.\n\nWith great care and patience, the shearer removed over 35 pounds of wool from Daisy's body – more than half her total body weight. The transformation was dramatic. Where before there had been a shapeless mass of dirty, matted wool, now stood a delicate, slender sheep who seemed almost bewildered by her newfound lightness.\n\nFor the first time in years, Daisy could move freely without strain. The sanctuary staff watched in delight as she took her first experimental jumps and kicks, seemingly testing her new mobility. This moment of liberation – from both physical burden and the fate that awaited her at the slaughterhouse – marked the beginning of Daisy's new life.",
        unlockLevel: 2
      },
      {
        id: "healing",
        title: "Healing Body and Spirit",
        content: "Beneath her heavy coat, Daisy's body bore the evidence of her difficult past. Her skin was irritated and infected in places where the wool had caused overheating and prevented proper air circulation. She was severely underweight, with ribs showing beneath her newly exposed skin, and blood tests revealed several nutritional deficiencies.\n\nThe sanctuary's veterinary team created a comprehensive care plan to address these issues. Medicated baths soothed her skin, a balanced diet helped restore her weight and health, and for the first time, Daisy experienced gentle handling and kind human voices.\n\nInitially fearful of people, Daisy would tremble when approached. Sanctuary volunteers would sit quietly near her, allowing her to investigate them on her own terms. Gradually, her fear subsided as she learned that these humans brought only good things – fresh grass, gentle scratches, and no pain or rough treatment.",
        unlockLevel: 3
      },
      {
        id: "flock",
        title: "Finding Her Flock",
        content: "Sheep are profoundly social animals who form strong bonds within their flocks. For Daisy, who had spent years in an overcrowded farm situation where proper social relationships were impossible, learning to interact appropriately with other sheep was a crucial part of her rehabilitation.\n\nThe sanctuary carefully introduced Daisy to a small flock of other rescued sheep. Initially, she stayed at the periphery, unsure of her place or how to engage. An older ewe named Marigold took Daisy under her wing, so to speak, often grazing nearby and showing tolerance when Daisy made social missteps.\n\nOver time, sanctuary staff observed Daisy integrating more fully with the flock. She learned the subtle communication cues that sheep use – the ear position that signals alertness, the head movements that establish hierarchy, and the comfort of sleeping in a tight group with her newfound friends. When visitors arrived, the flock would often move as a unit, with Daisy now confidently in their midst rather than trailing behind.",
        unlockLevel: 4,
        image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "ambassador",
        title: "Daisy the Ambassador",
        content: "Today, Daisy serves as an ambassador for the billions of sheep worldwide who are viewed as wool and meat producers rather than as individuals with rich emotional lives. When visitors come to the sanctuary, they're often surprised by how different Daisy is from the passive, unintelligent stereotype many people hold about sheep.\n\nThey learn that sheep can recognize and remember up to 50 individual human faces for years, distinguish between different human emotional expressions, and form specific preferences for certain people. They discover that sheep have best friends within their flocks, and that they experience joy, fear, anger, boredom, and even grief when separated from their companions.\n\nDaisy particularly enjoys interacting with children, approaching them curiously and gently taking treats from their hands. Many young visitors have transformative moments of connection with her, seeing for the first time the sentient being behind the wool product.\n\nThrough your compassionate choices – opting for plant-based meals and animal-free clothing and textiles – you're helping create a world where more animals like Daisy can live according to their true natures. While the global textile industry still treats most sheep as wool-producing machines, each person who chooses alternatives helps shift demand away from exploitation and toward a more compassionate future.",
        unlockLevel: 5
      }
    ]
  };  

  useEffect(() => {
    const storedCompanion = localStorage.getItem("companion");
    if (storedCompanion) {
      const parsedCompanion = JSON.parse(storedCompanion);
      setCompanionData(parsedCompanion);
      
      if (parsedCompanion.unlockedStories && parsedCompanion.unlockedStories.length > 0) {
        setCurrentStoryId(parsedCompanion.unlockedStories[0]);
      }
    }
  }, []);

  if (!companionData) {
    return <div>Loading stories...</div>;
  }

  // Get stories for this animal species
  const stories = storyData[companionData.species] || [];
  
  // Check if a story is selected
  const currentStory = currentStoryId 
    ? stories.find(story => story.id === currentStoryId) 
    : null;
  
  // Split story content into pages (approximately 150 words per page)
  const storyPages = currentStory 
    ? currentStory.content.split('\n\n')
    : [];

  const unlockStory = (storyId: string) => {
    if (companionData.unlockedStories.includes(storyId)) return;
    
    const updatedCompanion = {
      ...companionData,
      unlockedStories: [...companionData.unlockedStories, storyId],
      experience: companionData.experience + 25, // Reward for unlocking a new story
      happiness: Math.min(companionData.happiness + 10, 100)
    };
    
    // Check for level up
    if (updatedCompanion.experience >= updatedCompanion.nextLevelExp) {
      updatedCompanion.level += 1;
      updatedCompanion.nextLevelExp = updatedCompanion.nextLevelExp + 100 * updatedCompanion.level;
      
      toast({
        title: "Level Up!",
        description: `${companionData.name} has reached level ${updatedCompanion.level}!`,
        duration: 3000,
      });
    }
    
    localStorage.setItem("companion", JSON.stringify(updatedCompanion));
    setCompanionData(updatedCompanion);
    setCurrentStoryId(storyId);
    setCurrentPage(0);
    
    toast({
      title: "New Story Unlocked!",
      description: `You've unlocked "${stories.find(s => s.id === storyId)?.title}"!`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-4">
      {!currentStory ? (
        <>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {companionData.name}'s Story
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Learn about your companion's journey and how your actions are helping them thrive.
            Unlock new chapters as your bond grows stronger!
          </p>
          
          <div className="grid gap-4">
            {stories.map((story) => {
              const isUnlocked = companionData.unlockedStories.includes(story.id);
              const canUnlock = !isUnlocked && companionData.level >= story.unlockLevel;
              
              return (
                <Card key={story.id} className={!isUnlocked && !canUnlock ? "opacity-70" : ""}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      {isUnlocked ? (
                        <BookOpen className="h-5 w-5 text-primary" />
                      ) : (
                        <Lock className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {story.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isUnlocked ? "Read this chapter of your companion's story" : 
                         canUnlock ? "You can unlock this chapter now!" :
                         `Unlock at level ${story.unlockLevel}`}
                      </p>
                    </div>
                    <Button
                      variant={canUnlock ? "default" : isUnlocked ? "outline" : "ghost"}
                      size="sm"
                      disabled={!isUnlocked && !canUnlock}
                      onClick={() => isUnlocked ? setCurrentStoryId(story.id) : unlockStory(story.id)}
                    >
                      {isUnlocked ? "Read" : canUnlock ? "Unlock" : "Locked"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="sm" onClick={() => {
              setCurrentStoryId(null);
              setCurrentPage(0);
            }}>
              Back to Story List
            </Button>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Page {currentPage + 1} of {storyPages.length}
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
            {currentStory.title}
          </h3>
          
          <Card className="p-6">
            {currentStory.image && currentPage === 0 && (
              <div className="mb-4">
                <img 
                  src={currentStory.image} 
                  alt={currentStory.title}
                  className="w-full h-48 object-cover rounded-lg mb-4" 
                />
              </div>
            )}
            
            <AnimatePresence mode="wait">
              <motion.div
                key={`story-${currentStory.id}-page-${currentPage}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {storyPages[currentPage]}
                </p>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                size="sm"
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              >
                Previous
              </Button>
              
              <Button 
                variant={currentPage < storyPages.length - 1 ? "default" : "outline"}
                size="sm"
                disabled={currentPage >= storyPages.length - 1}
                onClick={() => setCurrentPage(prev => Math.min(storyPages.length - 1, prev + 1))}
                className="gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default CompanionStory;
